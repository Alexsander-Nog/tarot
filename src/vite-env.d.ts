/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_FIREBASE_API_KEY: string;
  readonly VITE_FIREBASE_AUTH_DOMAIN: string;
  readonly VITE_FIREBASE_PROJECT_ID: string;
  readonly VITE_FIREBASE_STORAGE_BUCKET?: string;
  readonly VITE_FIREBASE_MESSAGING_SENDER_ID?: string;
  readonly VITE_FIREBASE_APP_ID: string;

  // Destination number for the WhatsApp CTA on the result page (E.164 digits preferred).
  readonly VITE_WHATSAPP_BUSINESS_NUMBER?: string;

  // Google Apps Script Web App endpoint used to send quiz result emails (Firebase free-plan friendly).
  readonly VITE_EMAIL_WEBHOOK_URL?: string;
  readonly VITE_EMAIL_WEBHOOK_TOKEN?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
