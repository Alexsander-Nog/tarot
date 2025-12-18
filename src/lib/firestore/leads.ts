import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

export type ElementScores = {
  fogo: number;
  terra: number;
  ar: number;
  agua: number;
};

export type LeadPayload = {
  contact: {
    name: string;
    email: string;
    whatsapp: string;
  };
  consent: boolean;
  birth?: {
    date?: string;
    time?: string;
    city?: string;
    fullName?: string;
  };
  quiz: {
    scores: ElementScores;
    profileId: string;
  };
};

function cleanString(value: unknown, maxLen: number): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (!trimmed) return null;
  return trimmed.length > maxLen ? trimmed.slice(0, maxLen) : trimmed;
}

function cleanEmail(value: unknown): string {
  const raw = cleanString(value, 254) ?? "";
  return raw.toLowerCase();
}

function digitsOnly(value: unknown): string {
  if (typeof value !== "string") return "";
  return value.replace(/\D/g, "");
}

function nullifyUndefined<T extends Record<string, unknown>>(obj: T): T {
  const out: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(obj)) {
    out[key] = value === undefined ? null : value;
  }
  return out as T;
}

export async function saveLead(payload: LeadPayload) {
  const meta = nullifyUndefined({
    userAgent: typeof navigator !== "undefined" ? navigator.userAgent : null,
    language: typeof navigator !== "undefined" ? navigator.language : null,
    referrer: typeof document !== "undefined" ? document.referrer : null,
    pathname: typeof window !== "undefined" ? window.location.pathname : null,
    href: typeof window !== "undefined" ? window.location.href : null,
  });

  const contactName = cleanString(payload.contact.name, 80) ?? "";
  const email = cleanEmail(payload.contact.email);

  // Store a normalized phone for querying (digits only), but keep it as a string.
  const whatsappDigits = digitsOnly(payload.contact.whatsapp);
  const whatsapp = whatsappDigits || (cleanString(payload.contact.whatsapp, 30) ?? "");

  const birth = nullifyUndefined({
    fullName: cleanString(payload.birth?.fullName, 80),
    city: cleanString(payload.birth?.city, 80),
    date: cleanString(payload.birth?.date, 10),
    time: cleanString(payload.birth?.time, 5),
  });

  const leadDoc = {
    contact: {
      name: contactName,
      email,
      whatsapp,
    },
    consent: !!payload.consent,
    birth,
    quiz: {
      scores: payload.quiz.scores,
      profileId: payload.quiz.profileId,
    },
    meta,
    createdAt: serverTimestamp(),
  };

  const docRef = await addDoc(collection(db, "leads"), leadDoc);

  return docRef.id;
}
