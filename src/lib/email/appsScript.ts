import type { ElementScores } from "@/lib/firestore/leads";
import { profiles } from "@/app/components/profiles";

export type AppsScriptQuizEmailPayload = {
  to: string;
  name: string;
  profileId: string;
  scores: ElementScores;
  whatsappBusinessNumber?: string;
  sex?: "feminino" | "masculino";
};

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function buildWhatsAppLink(whatsappBusinessNumber?: string, profileName?: string): string | null {
  const digits = (whatsappBusinessNumber ?? "").replace(/\D/g, "");
  if (!digits) return null;

  const message = encodeURIComponent(
    `Oi! Acabei de fazer o teste 'Descubra Seu Perfil Amoroso' e meu resultado foi ${profileName ?? ""}. Gostaria de saber mais sobre a consulta personalizada! 🌟`
  );
  return `https://wa.me/${digits}?text=${message}`;
}

function buildEmailHtml(args: {
  userName: string;
  sex?: "feminino" | "masculino";
  profileId: string;
  scores: ElementScores;
  whatsappBusinessNumber?: string;
}): { subject: string; htmlBody: string; profileName: string } {
  const profile = profiles[args.profileId] ?? profiles.fenix;

  const safeName = escapeHtml(args.userName || "");
  const profileTitle = escapeHtml(profile.title);
  const profileName = escapeHtml(profile.name);
  const description = escapeHtml(profile.description);

  const waLink = buildWhatsAppLink(args.whatsappBusinessNumber, profile.name);
  const scores = args.scores;

  const tarotItems = profile.tarotCards
    .map((card, idx) => {
      const cardName = escapeHtml(card.name);
      const meaning = escapeHtml(card.meaning);
      return `<li style="margin:6px 0;"><b>${idx + 1}.</b> <span>${cardName}</span> — ${meaning}</li>`;
    })
    .join("");

  const guidanceItems = profile.weeklyGuidance
    .map((item) => `<li style="margin:6px 0;"><b>Semana ${item.week}:</b> ${escapeHtml(item.guidance)}</li>`)
    .join("");

  const strengths = profile.strengths.map((s) => `<li style="margin:4px 0;">${escapeHtml(s)}</li>`).join("");
  const challenges = profile.challenges.map((c) => `<li style="margin:4px 0;">${escapeHtml(c)}</li>`).join("");

  const dear = args.sex === "masculino" ? "Querido" : args.sex === "feminino" ? "Querida" : "Olá";
  const subject = `Seu resultado: ${profile.name}`;

  const htmlBody = `
<div style="font-family:Arial,sans-serif;line-height:1.6;color:#111;">
  <p style="font-size:16px;">${dear} <b>${safeName}</b>,</p>
  <p style="font-size:16px;">Seu perfil astral revelado foi: <b>${profileTitle}</b> (${profileName}).</p>
  <p style="font-size:15px;">${description}</p>

  <hr style="border:none;border-top:1px solid #e5e7eb;margin:18px 0;"/>

  <h3 style="margin:0 0 8px;">ANÁLISE DO SEU SIGNO AMOROSO</h3>
  <p style="margin:0 0 8px;"><b>✨ Forças:</b></p>
  <ul style="margin:0 0 10px;padding-left:18px;">${strengths}</ul>
  <p style="margin:0 0 8px;"><b>⚠️ Desafios:</b></p>
  <ul style="margin:0 0 10px;padding-left:18px;">${challenges}</ul>
  <p style="margin:0 0 10px;"><b>🔍 Padrão oculto:</b> ${escapeHtml(profile.hiddenPattern)}</p>

  <h3 style="margin:16px 0 8px;">SUAS 3 CARTAS DO AMOR</h3>
  <ul style="margin:0 0 10px;padding-left:18px;">${tarotItems}</ul>

  <h3 style="margin:16px 0 8px;">✨ RITUAL DE ATRAÇÃO PERSONALIZADO</h3>
  <p style="margin:0 0 10px;">${escapeHtml(profile.ritual)}</p>

  <h3 style="margin:16px 0 8px;">ORIENTAÇÕES PARA OS PRÓXIMOS 30 DIAS</h3>
  <ul style="margin:0 0 10px;padding-left:18px;">${guidanceItems}</ul>

  <h3 style="margin:16px 0 8px;">Sua pontuação</h3>
  <ul style="margin:0 0 10px;padding-left:18px;">
    <li>Fogo: <b>${Number(scores.fogo ?? 0)}</b></li>
    <li>Terra: <b>${Number(scores.terra ?? 0)}</b></li>
    <li>Ar: <b>${Number(scores.ar ?? 0)}</b></li>
    <li>Água: <b>${Number(scores.agua ?? 0)}</b></li>
  </ul>

  ${waLink ? `<p style="margin:16px 0 0;"><a href="${waLink}">Falar no WhatsApp</a></p>` : ""}
  <p style="margin:14px 0 0;font-size:12px;color:#6b7280;">Se precisar, responda este email para falar com: contato.soraiatarot@gmail.com</p>
</div>`;

  return { subject, htmlBody, profileName: profile.name };
}

function getWebhookConfig(): { url: string; token?: string } {
  const url = import.meta.env.VITE_EMAIL_WEBHOOK_URL?.trim();
  if (!url) {
    throw new Error("Missing VITE_EMAIL_WEBHOOK_URL");
  }

  const token = import.meta.env.VITE_EMAIL_WEBHOOK_TOKEN?.trim();
  return { url, token: token || undefined };
}

export async function sendQuizResultEmailViaAppsScript(payload: AppsScriptQuizEmailPayload) {
  const { url, token } = getWebhookConfig();

  // Avoid CORS preflight; Apps Script Web Apps can be flaky with CORS.
  // `no-cors` => we can't read the response, but the request is sent.
  const fullUrl = token ? `${url}${url.includes("?") ? "&" : "?"}token=${encodeURIComponent(token)}` : url;

  const { subject, htmlBody, profileName } = buildEmailHtml({
    userName: payload.name,
    sex: payload.sex,
    profileId: payload.profileId,
    scores: payload.scores,
    whatsappBusinessNumber: payload.whatsappBusinessNumber,
  });

  const body = {
    to: payload.to,
    subject,
    htmlBody,
    // keep these for backwards compatibility / debugging
    name: payload.name,
    profileId: payload.profileId,
    profileName,
    scores: payload.scores,
    whatsappBusinessNumber: payload.whatsappBusinessNumber ?? null,
    sex: payload.sex ?? null,
  };

  await fetch(fullUrl, {
    method: "POST",
    mode: "no-cors",
    headers: {
      "Content-Type": "text/plain;charset=UTF-8",
    },
    body: JSON.stringify(body),
  });
}
