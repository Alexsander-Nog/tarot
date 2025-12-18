# Copilot instructions (project-specific)

## Big picture
- This repo looks like a **Figma Make export**: note the config filenames `package (1).json`, `vite.config (1).ts`, `postcss.config (1).mjs`, and `ATTRIBUTIONS (2).md`.
- The main app logic is a **single-page quiz funnel** implemented entirely in React components under `src/app/`.

## Key architecture & data flow
- `src/app/App.tsx` is the orchestrator:
  - Screen state is a simple union: `"landing" | "quiz" | "leadCapture" | "result"`.
  - Quiz progression is driven by `currentQuestionIndex` and `questions` from `src/app/components/quizData.ts`.
  - Scoring uses an element tally: `Scores { fogo, terra, ar, agua }`.
  - Profile selection happens via `determineProfile(scores)`; ties or low totals return `"fenix"`.
- `src/app/components/QuizQuestion.tsx` renders either:
  - `type: "form"` fields (submits a `FormData`-derived object), or
  - `type: "multiple-choice"` options (passes the selected `QuizOption`).
- `src/app/components/LeadCaptureForm.tsx` collects `name/email/whatsapp/consent` and calls `onSubmit`.
- `src/app/components/ResultPage.tsx` maps a `profile.id` to a local `profiles` record and builds a WhatsApp deep link via `https://wa.me/...`.

## UI / styling conventions
- Animations use **Motion One** (`motion/react`), not Framer Motion.
- Icons come from `lucide-react`.
- Styling is Tailwind utility-first; this codebase currently uses many **inline hex colors** inside class strings (e.g. `text-[#F59E0B]`). Keep changes consistent with existing styling.
- shadcn/ui-style primitives live in `src/app/components/ui/` (e.g. `button.tsx`, `dialog.tsx`). Shared Tailwind class merging helper: `cn` in `src/app/components/ui/utils.ts`.

## Build/tooling notes (as-is)
- Vite config: `vite.config (1).ts`.
  - Keep both plugins enabled: `@vitejs/plugin-react` and `@tailwindcss/vite` (the file comment says they’re required).
  - Import alias `@` resolves to `./src`.
- PostCSS config: `postcss.config (1).mjs` is intentionally empty for Tailwind v4 unless extra plugins are added.
- `package (1).json` currently defines only `"build": "vite build"`.

## Firebase / Firestore
- Firebase is initialized in `src/lib/firebase.ts` using Vite env vars (`VITE_FIREBASE_*`). See `.env.example`.
- Lead submissions are persisted to Firestore collection `leads` via `src/lib/firestore/leads.ts` and are called from `src/app/App.tsx` inside `handleLeadCapture`.

## Practical editing guidance
- Prefer small, local changes within `src/app/components/*` and keep the funnel flow in `App.tsx` as the single source of truth for navigation and scoring.
- When adding/adjusting quiz content, edit `src/app/components/quizData.ts` and keep `Question`/`QuizOption` shapes aligned with `src/app/components/QuizQuestion.tsx`.
- Avoid introducing new state managers or routing unless the existing patterns require it.
