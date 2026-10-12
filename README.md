# Fermor — Money, made clearer

A polished, responsive finance dashboard concept built for the Fermor frontend assignment. The visual direction uses a calm editorial finance aesthetic: warm off-white surfaces, deep botanical green, restrained amber accents, generous spacing, and compact data visualisations. It intentionally avoids a generic AI-generated landing-page template.

## Features
- Responsive finance dashboard with balance visibility toggle, cash-flow chart, spending breakdown, and recent transactions.
- Transactions search, income/expense filters, add-transaction flow, and CSV export.
- Monthly budget categories with progress states, attention filters, and add-budget flow.
- Savings goals with progress tracking, create-goal flow, and demo contribution action.
- Money insights and a financial wellness score illustration (explicitly not a credit score).
- Rule-based “Money notes” assistant using sample data. This is not a connected AI service and does not send data to an external model.
- Recurring bill list with active/inactive toggles and monthly estimate.
- Reports with monthly summaries and CSV export.
- Profile editing, notification popover, onboarding flow, demo-mode cues, and dark mode.
- Responsive sidebar navigation and mobile layout.

## Run locally
Requirements: Node.js 18+ recommended.

```bash
npm install
npm run dev
```

Open the local URL printed by Vite.

## Production build
```bash
npm run build
npm run preview
```

## Deploy
Import this folder/repository into Vercel or Netlify. Use `npm run build` as the build command and `dist` as the output directory.

## Notes and limitations
- This is a frontend prototype with illustrative sample data. It does not connect to a bank, process payments, or provide financial advice.
- Profile edits, budgets, goals, recurring bills, and new transactions are kept in in-memory React state and reset on refresh. Authentication and persistent storage are not wired up.
- CSV export creates a local file from the current transaction list.
- Charts use Recharts and icons use Lucide React.
- The money helper uses transparent, simple rule-based responses for this assignment; no AI API is connected.
