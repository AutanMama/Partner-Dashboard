# ApexIB — Partner Dashboard

A modern, premium **Introducing Broker / Affiliate Partner Dashboard** for a forex / fintech brokerage. Designed to look investor-ready: glassmorphism cards, dark gradient palette (black · brand blue · emerald), Framer Motion animations and live-feel analytics charts.

![Stack](https://img.shields.io/badge/Next.js-14-black) ![React](https://img.shields.io/badge/React-18-149eca) ![Tailwind](https://img.shields.io/badge/Tailwind-3-38bdf8) ![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6)

---

## ✨ Features

- **8 fully-built routes** — Dashboard, Clients, Trades, Clicks, Reports, Commissions, Analytics, Settings
- **Glassmorphism UI** with smooth Framer Motion entrance animations
- **Advanced charts** powered by Recharts — area, line, bar, composed, pie, radar
- **Responsive layout** — sticky desktop sidebar + mobile drawer
- **Premium stat cards** with embedded sparklines and trend indicators
- **Filter system** — Day / Month / Year toggle, date picker, year selector
- **Smart tables** — searchable, filterable, paginated clients & trades ledger
- **Recent activity feed**, traffic geography, retention cohort heat-map
- **Dark mode by default**, refined typography (Inter + Sora)

## 🧱 Tech Stack

| Layer        | Library                                |
| ------------ | -------------------------------------- |
| Framework    | Next.js 14 (App Router)                |
| UI           | React 18 + TypeScript                  |
| Styling      | Tailwind CSS 3                         |
| Animation    | Framer Motion 11                       |
| Charts       | Recharts 2                             |
| Icons        | Lucide React                           |

## 🚀 Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## 📦 Scripts

| Command          | Description                       |
| ---------------- | --------------------------------- |
| `npm run dev`    | Start dev server with hot reload  |
| `npm run build`  | Build production bundle           |
| `npm start`      | Start production server           |
| `npm run lint`   | Lint the project                  |

## 📁 Project Structure

```
partner-dashboard/
├── app/
│   ├── layout.tsx              # Root layout + shell
│   ├── page.tsx                # Dashboard
│   ├── clients/page.tsx
│   ├── trades/page.tsx
│   ├── clicks/page.tsx
│   ├── reports/page.tsx
│   ├── commissions/page.tsx
│   ├── analytics/page.tsx
│   ├── settings/page.tsx
│   └── globals.css
├── components/
│   ├── layout/                 # Sidebar, Topbar, Shell
│   ├── dashboard/              # Cards, charts, filter bar
│   ├── tables/                 # Clients & trades tables
│   └── ui/                     # Card, Badge, Button, Sparkline
├── lib/
│   ├── data.ts                 # Mock realistic data
│   └── utils.ts                # Formatters + cn()
└── tailwind.config.ts
```

## 🎨 Design Notes

- Palette: `#05070d` ink base, `#2667ff` brand blue, `#10b981` emerald accent
- Cards use a soft glass layer (`backdrop-blur`) with hover lift + glow
- Charts share a custom dark tooltip and consistent gradient fills
- Sidebar uses an active gradient pill with Framer Motion layoutId for the indicator

## 📊 Sample KPIs

The dashboard ships with realistic, deterministic mock data:

- 2,883 Client Registrations · 2,577 Account Registrations
- 891 Lots · 91.7M USD notional
- $73,685 Deposits · $51,875 Withdrawals · $21,810 Net
- $16,038 Commission earned

## 📝 License

Internal demo / portfolio project.
