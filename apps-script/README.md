# Apps Script email webhook (Gmail)

This folder contains a simple Google Apps Script Web App that sends the quiz result email using the Gmail account that deploys the script.

## 1) Create the script
1. Go to https://script.google.com/
2. **New project**
3. Replace the default `Code.gs` with the contents of `apps-script/Code.gs`

## 2) (Recommended) Set a token
1. In Apps Script: **Project Settings** → **Script properties**
2. Add:
   - `WEBHOOK_TOKEN` = a random string (example: `change-me-123`)

## 3) Deploy as Web App
1. **Deploy** → **New deployment**
2. Select **Web app**
3. Execute as: **Me**
4. Who has access: **Anyone**
5. Deploy and copy the **Web App URL**

## 4) Configure the frontend
Add to your `.env.local`:

```dotenv
VITE_EMAIL_WEBHOOK_URL="<YOUR_WEB_APP_URL>"
VITE_EMAIL_WEBHOOK_TOKEN="<YOUR_WEBHOOK_TOKEN>"
```

Then run:

```powershell
npm run dev
```

## Notes
- This works on the Firebase **free** plan because it does not use Cloud Functions.
- It uses Apps Script/Gmail quotas and is not meant for high volume.
- The token is a basic guard (it lives in the frontend), so it reduces noise but is not a strong security boundary.
