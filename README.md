# Astrologia Quiz (Vite + React)

## Deploy (Vercel)
1. Vercel → **Add New Project** → importe o repo do GitHub.
2. Em **Settings → Environment Variables**, adicione as mesmas variáveis do seu `.env.local`.
3. Deploy.

Env vars (produção):
- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_STORAGE_BUCKET`
- `VITE_FIREBASE_MESSAGING_SENDER_ID`
- `VITE_FIREBASE_APP_ID`
- `VITE_EMAIL_WEBHOOK_URL`
- `VITE_EMAIL_WEBHOOK_TOKEN` (se configurado no Apps Script)
- `VITE_WHATSAPP_BUSINESS_NUMBER` (opcional)

Notas:
- Este app é SPA; o `vercel.json` já inclui rewrite para `index.html`.
- Não commite `.env.local` (já está no `.gitignore`).

## Setup
1. Create `.env.local` based on `.env.example` and fill with your Firebase **Web App** config.
2. Install deps and run.

```powershell
npm install
npm run dev
```

Optional:
- Set `VITE_WHATSAPP_BUSINESS_NUMBER` in `.env.local` to control the destination of the WhatsApp CTA on the result page.

## Firestore
- Leads are saved to the `leads` collection.
- Write happens when the user submits `src/app/components/LeadCaptureForm.tsx` (wired in `src/app/App.tsx`).

## Email (quiz result)
There are two options:

### Option A (Firebase free plan): Google Apps Script (Gmail)
This repo includes an Apps Script webhook that sends the result email using your Gmail account (no Firebase Functions required).

- Script: `apps-script/Code.gs`
- Setup guide: `apps-script/README.md`

Frontend env vars:
- `VITE_EMAIL_WEBHOOK_URL`
- `VITE_EMAIL_WEBHOOK_TOKEN` (optional)

### Option B (requires Blaze): Firebase Cloud Functions + Resend
Email sending is also implemented as a Firebase **Cloud Function** triggered by new docs in `leads/{leadId}`:
- Function code: `functions/src/index.ts` (`emailQuizResult`)
- Provider: Resend (set `RESEND_API_KEY` + `RESEND_FROM_EMAIL`)

Gmail note:
- The function always sets `Reply-To: contato.soraiatarot@gmail.com`.
- If Resend rejects `RESEND_FROM_EMAIL` (not verified/allowed), you can set `RESEND_FALLBACK_FROM_EMAIL` to a verified sender and the function will retry automatically.

### Deploy functions
Prereq: install Firebase CLI and login.

```powershell
npm install -g firebase-tools
firebase login
firebase use astrologia-53c71
```

Install function deps and build:

```powershell
cd functions
npm install
npm run build
cd ..
```

Configure env vars in the Cloud Functions environment (recommended: use Secrets for API keys). At minimum you need:
- `RESEND_API_KEY` (Secret)
- `RESEND_FROM_EMAIL` (example: `Soraiá Tarot <contato.soraiatarot@gmail.com>`)
- `WHATSAPP_BUSINESS_NUMBER` (optional, used in the email CTA)

Setting the Resend API key as a secret:

```powershell
firebase functions:secrets:set RESEND_API_KEY
firebase deploy --only functions
```

Then deploy:

```powershell
firebase deploy --only functions
```

### Security rules
This repo includes a strict rules file at `firestore.rules`:
- Allows **only** `create` on `leads`
- Denies client `read/update/delete`
- Validates the exact shape written by `src/lib/firestore/leads.ts`

To apply in Firebase Console:
1. Firestore Database → **Rules**
2. Replace the rules with the contents of `firestore.rules`
3. Publish

Note: the app writes `createdAt` using `serverTimestamp()` and rules require it to equal `request.time`.

If you’re testing quickly, ensure your Firestore rules allow client writes (then tighten them later).
