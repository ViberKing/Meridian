# Meridian

**PropTech platform for real estate investors — deal sourcing, portfolio management, and operational tooling.**

Meridian connects the fragmented parts of the UK property investment lifecycle into one platform. It integrates directly with estate agents, mortgage brokers, and auction houses to give investors and developers a single system for finding, financing, managing, and exiting deals.

---

## Problem

Property investors currently juggle spreadsheets, email chains, WhatsApp groups, and disconnected tools to manage their operations. Deal sourcing is manual. Contractor coordination is chaotic. Portfolio tracking is fragmented. There is no unified platform that connects the entire investment workflow — from acquisition through to exit.

Estate agents, mortgage brokers, and auction houses each operate in silos, creating friction and missed opportunities for investors who work across all three.

---

## Solution

Meridian is a platform that sits at the centre of the property investment workflow:

### For Investors & Developers
- **Deal Pipeline** — Aggregate listings from agents, auctions, and off-market sources into a single searchable pipeline with filters for yield, area, property type, and renovation potential
- **Deal Analysis** — Automated comparable analysis, refurbishment cost estimation, rental yield calculations, and flip margin projections
- **Portfolio Dashboard** — Track all properties, tenants, contractors, budgets, and timelines in one view
- **Contractor Management** — Assign trades to projects, track progress, manage quotes, and log spend against budgets
- **Financial Tracking** — Mortgage payments, rental income, refurbishment spend, and P&L per property and across the portfolio

### For Agents & Brokers (Integration Partners)
- **Agent Portal** — Estate agents can push listings to Meridian's investor network, reaching qualified buyers faster
- **Broker Integration** — Mortgage brokers can receive pre-qualified leads with deal details already attached
- **Auction Feed** — Auction houses can list lots directly, with automated notifications to investors matching their criteria

---

## Architecture

```
┌─────────────────────────────────────────────────┐
│                   Meridian App                   │
│              (Next.js / TypeScript)              │
├──────────┬──────────┬──────────┬────────────────┤
│  Deal    │ Portfolio │Contractor│   Financial    │
│ Pipeline │ Manager  │ Tracker  │   Dashboard    │
├──────────┴──────────┴──────────┴────────────────┤
│                  API Layer                       │
│              (Next.js API Routes)                │
├──────────┬──────────┬───────────────────────────┤
│ Supabase │  Stripe  │  External Integrations    │
│ (Postgres│(Payments)│  (Rightmove, Zoopla,      │
│  + Auth) │          │   auction APIs, broker    │
│          │          │   portals)                │
└──────────┴──────────┴───────────────────────────┘
```

---

## Planned Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | Next.js 14, React 18, TypeScript, Tailwind CSS |
| **Backend** | Next.js API Routes, Python (data analysis & scraping) |
| **Database** | Supabase (PostgreSQL + Row Level Security) |
| **Payments** | Stripe (SaaS subscriptions for investor accounts) |
| **Data Sources** | Rightmove, Zoopla, auction house APIs, Land Registry |
| **Analytics** | Python (pandas, NumPy) for comparable analysis and yield modelling |
| **Deployment** | Vercel |

---

## Data Model (Draft)

```sql
-- Core entities
properties        -- address, type, status, purchase_price, current_value
deals             -- property_id, stage (sourced/analysed/offered/exchanged/completed)
portfolios        -- user_id, name, properties[]

-- Operations
contractors       -- name, trade, rate, rating
projects          -- property_id, budget, timeline, status
project_tasks     -- project_id, contractor_id, description, cost, completed

-- Financial
transactions      -- property_id, type (mortgage/rent/refurb/insurance), amount, date
mortgages         -- property_id, lender, rate, term, monthly_payment

-- Integrations
agent_listings    -- agent_id, property details, pushed_at
auction_lots      -- auction_house_id, lot details, guide_price, auction_date
broker_leads      -- broker_id, deal_id, status
```

---

## Market Opportunity

The UK property investment market lacks a dedicated software platform. Current tools are either:
- **Too generic** — project management tools (Notion, Monday) that don't understand property
- **Too narrow** — rent collection apps that ignore acquisition and development
- **Too manual** — spreadsheets that break at scale

Meridian targets the gap: a purpose-built operating system for property investors who manage multiple deals, renovations, and tenants simultaneously.

---

## Status

Currently in design and early development. The data model and architecture are being refined based on first-hand experience managing property investments.

Built by [Hayden King](https://github.com/ViberKing) — property investor and software developer.

---

## License

[MIT](LICENSE)
