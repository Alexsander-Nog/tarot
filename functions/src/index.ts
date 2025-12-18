import { initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { onDocumentCreated } from "firebase-functions/v2/firestore";
import { logger } from "firebase-functions";
import { defineSecret } from "firebase-functions/params";
import { Resend } from "resend";

initializeApp();

const db = getFirestore();

const RESEND_API_KEY = defineSecret("RESEND_API_KEY");

type ElementScores = {
  fogo: number;
  terra: number;
  ar: number;
  agua: number;
};

type LeadDoc = {
  contact: { name: string; email: string; whatsapp: string };
  consent: boolean;
  birth: { fullName: string | null; date: string | null; time: string | null; city: string | null };
  quiz: { scores: ElementScores; profileId: string };
  meta?: Record<string, unknown>;
  createdAt?: unknown;
};

const profileCopy: Record<
  string,
  {
    title: string;
    name: string;
    emoji: string;
    oneLiner: string;
  }
> = {
  fogo: {
    title: "GUERREIRA APAIXONADA",
    name: "Guerreira Apaixonada",
    emoji: "🔥",
    oneLiner: "Você ama com intensidade e iniciativa — o equilíbrio é o seu superpoder.",
  },
  terra: {
    title: "RAINHA TERRENA",
    name: "Rainha Terrena",
    emoji: "🌿",
    oneLiner: "Você traz estabilidade e lealdade — lembre de deixar o amor respirar.",
  },
  ar: {
    title: "BORBOLETA SOCIAL",
    name: "Borboleta Social",
    emoji: "🦋",
    oneLiner: "Sua comunicação é magnética — intimidade cresce com presença.",
  },
  agua: {
    title: "SEREIA EMOCIONAL",
    name: "Sereia Emocional",
    emoji: "🌊",
    oneLiner: "Sua profundidade emocional é rara — limites saudáveis te protegem.",
  },
  fenix: {
    title: "FÊNIX TRANSFORMADORA",
    name: "Fênix Transformadora",
    emoji: "🔥🦅",
    oneLiner: "Você renasce e transforma — estabilidade com autenticidade é o caminho.",
  },
};

function getEnv(name: string): string | null {
  const v = process.env[name];
  if (!v) return null;
  const trimmed = v.trim();
  return trimmed ? trimmed : null;
}

function shouldRetryWithFallbackFrom(err: unknown): boolean {
  const msg = String((err as any)?.message ?? err ?? "").toLowerCase();

  // Heuristic: Resend errors for invalid/unverified sender commonly mention these.
  return (
    msg.includes("from") &&
    (msg.includes("verify") ||
      msg.includes("verified") ||
      msg.includes("not allowed") ||
      msg.includes("forbidden") ||
      msg.includes("invalid") ||
      msg.includes("sender"))
  );
}

function waLink(businessNumber: string | null, message: string) {
  if (!businessNumber) return null;
  const digits = businessNumber.replace(/\D/g, "");
  if (!digits) return null;
  const text = encodeURIComponent(message);
  return `https://wa.me/${digits}?text=${text}`;
}

function htmlEscape(s: string) {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export const emailQuizResult = onDocumentCreated(
  { document: "leads/{leadId}", secrets: [RESEND_API_KEY] },
  async (event) => {
    const snap = event.data;
    if (!snap) return;

    const leadId = event.params.leadId;
    const data = snap.data() as LeadDoc;

    const toEmail = data?.contact?.email;
    if (!toEmail) {
      logger.warn("Lead has no email", { leadId });
      return;
    }

    // Idempotency guard
    const ref = db.collection("leads").doc(leadId);
    const existing = await ref.get();
    const existingData = existing.data() as any;
    if (existingData?.email?.status === "sent") {
      logger.info("Email already sent", { leadId });
      return;
    }

    const profileId = data?.quiz?.profileId || "fenix";
    const profile = profileCopy[profileId] ?? profileCopy.fenix;

    const contactName = (data?.contact?.name || "").trim() || "amiga";
    const subject = `${profile.emoji} Seu Perfil Amoroso: ${profile.title}`;

    const businessNumber = getEnv("WHATSAPP_BUSINESS_NUMBER");
    const whatsappMessage = `Oi! Acabei de fazer o teste 'Descubra Seu Perfil Amoroso' e meu resultado foi ${profile.name}. Gostaria de saber mais sobre a consulta personalizada! 🌟`;
    const whatsappHref = waLink(businessNumber, whatsappMessage);

    const scores = data?.quiz?.scores;
    const scoreLine = scores
      ? `Fogo: ${scores.fogo} | Terra: ${scores.terra} | Ar: ${scores.ar} | Água: ${scores.agua}`
      : null;

    const from = getEnv("RESEND_FROM_EMAIL");
    const fallbackFrom = getEnv("RESEND_FALLBACK_FROM_EMAIL");
    const apiKey = RESEND_API_KEY.value();

    if (!from || !apiKey) {
      logger.error("Missing RESEND_FROM_EMAIL or RESEND_API_KEY", { leadId });
      await ref.set(
        {
          email: {
            status: "error",
            error: "Missing RESEND_FROM_EMAIL or RESEND_API_KEY",
            updatedAt: new Date().toISOString(),
          },
        },
        { merge: true }
      );
      return;
    }

    const resend = new Resend(apiKey);

    const html = `
      <div style="font-family: Arial, sans-serif; line-height: 1.5;">
        <h2>Olá, ${htmlEscape(contactName)}!</h2>
        <p>Seu resultado do teste <strong>"Descubra Seu Perfil Amoroso"</strong> chegou:</p>
        <h1 style="margin: 8px 0;">${htmlEscape(profile.emoji)} ${htmlEscape(profile.title)}</h1>
        <p style="margin-top: 0;">${htmlEscape(profile.oneLiner)}</p>
        ${scoreLine ? `<p><strong>Pontuação:</strong> ${htmlEscape(scoreLine)}</p>` : ""}
        <hr />
        <p>Se você quiser uma análise personalizada, posso te atender no WhatsApp.</p>
        ${
          whatsappHref
            ? `<p><a href="${whatsappHref}" target="_blank" rel="noopener noreferrer">Falar comigo no WhatsApp</a></p>`
            : ""
        }
        <p style="color: #666; font-size: 12px;">Este email é o envio do seu resultado (mensagem transacional).</p>
      </div>
    `;

    try {
      let resp: any;
      try {
        resp = await resend.emails.send({
          from,
          to: toEmail,
          subject,
          html,
          replyTo: "contato.soraiatarot@gmail.com",
        });
      } catch (err: any) {
        if (fallbackFrom && shouldRetryWithFallbackFrom(err)) {
          logger.warn("Primary From rejected; retrying with fallback From", { leadId });
          resp = await resend.emails.send({
            from: fallbackFrom,
            to: toEmail,
            subject,
            html,
            replyTo: "contato.soraiatarot@gmail.com",
          });
        } else {
          throw err;
        }
      }

      await ref.set(
        {
          email: {
            status: "sent",
            provider: "resend",
            providerId: (resp as any)?.data?.id ?? null,
            sentAt: new Date().toISOString(),
          },
        },
        { merge: true }
      );

      logger.info("Quiz result email sent", { leadId, toEmail });
    } catch (err: any) {
      logger.error("Failed to send email", { leadId, err });
      await ref.set(
        {
          email: {
            status: "error",
            provider: "resend",
            error: String(err?.message ?? err),
            updatedAt: new Date().toISOString(),
          },
        },
        { merge: true }
      );
    }
  }
);
