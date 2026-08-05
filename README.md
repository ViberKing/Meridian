# Harbour 🌊

**Your all-in-one life OS.** Harbour collects the tools you run your life with into one installable, offline-first app. The first live module is **Swim Coaching** — a full replacement for the Swim Coaching Tracker spreadsheet.

## Swim Coaching module

| Section | What it does |
|---|---|
| **Dashboard** | This week / this month / all-time lessons, income, and your cut — plus a month-by-month earnings chart, upcoming lessons, unpaid lessons, and active blocks. |
| **Calendar** | Weekly availability grid (07:00–21:00, half-hour slots). Tap a slot to mark it available, blocked, or booked with a swimmer's name. Copy last week's layout in one tap. |
| **Bookings** | One row per lesson. Prices and your share fill in automatically from Settings. Payment states: paid, due, block (prepaid), free, cancelled. |
| **Swimmers** | Contact cards with live lesson counts and totals paid. |
| **Blocks** | 5 weeks + 1 free = 6 lessons for £100. Progress rings tick off automatically from the bookings log. Block money is counted once, on the start date. |
| **Settings** | Edit prices and block terms; export/import a JSON backup; reset to the original spreadsheet data. |

Data lives in `localStorage` on the device — no account, no server. The original spreadsheet's swimmers, bookings, blocks, and calendar are pre-loaded as seed data.

## Running it

It's a static app — no build step. Serve the `harbour/` folder over HTTP:

```bash
cd harbour
python3 -m http.server 8080   # or: npx serve .
```

Then open http://localhost:8080.

### Installing as an app

PWA install requires HTTPS (or localhost). Once deployed:

- **iPhone** — open in Safari → Share → *Add to Home Screen*
- **Android / desktop Chrome** — use the *Install app* prompt in the browser menu

Installed, it launches full-screen with its own icon and works fully offline.

### Deploying with GitHub Pages

A workflow at `.github/workflows/deploy-harbour.yml` publishes `harbour/` to GitHub Pages on every push to `main`. Enable it once in the repo: **Settings → Pages → Source → GitHub Actions**. The app will be live at `https://<user>.github.io/<repo>/`.

## Tech

Vanilla ES modules, hand-rolled CSS design system, zero dependencies, zero build. Service worker precaches the shell for offline use. The earnings chart is inline SVG with colours validated for contrast and colour-vision safety on the app's dark surface.
