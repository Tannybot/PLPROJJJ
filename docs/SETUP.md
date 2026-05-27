# PLASS Simple Setup Guide

PLASS is a full-stack Programming Language Assessment & Suitability Simulator built as a modern SaaS-style capstone platform.

## Easiest Way to Run

Use this first if you only want to open and demo the system.

### 1. Install Dependencies

Run this in the project folder:

```powershell
npm install
```

### 2. Start the Web App

```powershell
npm run dev
```

Open:

```text
http://localhost:3000
```

That is enough to view the landing page, dashboard, comparison page, knowledge base, admin UI, and simulation screen.

## Optional: Start the Backend API

Open a second PowerShell window in the same project folder and run:

```powershell
npm run db:generate
npm run dev:api
```

The API will run at:

```text
http://localhost:4000/api/health
```

The simulation still works even if the database is not ready. It uses the built-in scoring engine and returns results without saving them.

## Optional: Add Database Saving Later

Only do this when you want saved simulations, users, reports, and admin data.

### Option A: Use Docker

Install Docker Desktop, reopen PowerShell, then run:

```powershell
docker compose up postgres -d
npm run db:migrate
npm run db:seed
```

### Option B: Use a Hosted Database

Create a free PostgreSQL database from Neon, Supabase, or Railway.

Create a `.env` file from `.env.example`, then replace `DATABASE_URL` with your hosted PostgreSQL connection string.

Then run:

```powershell
npm run db:generate
npm run db:migrate
npm run db:seed
```

## Common Commands

Start frontend:

```powershell
npm run dev
```

Start backend:

```powershell
npm run dev:api
```

Build everything:

```powershell
npm run build
```

## Simple Development Flow

1. Run `npm install`.
2. Run `npm run dev`.
3. Open `http://localhost:3000`.
4. Work on the UI and simulation features.
5. Add PostgreSQL only when you need saved data.

## Stack

- Frontend: Next.js 15, React, TypeScript, TailwindCSS, Framer Motion
- Backend: Node.js, Express.js REST API
- Database: PostgreSQL with Prisma ORM
- Auth: NextAuth scaffold
- Charts: Recharts
- Reports: jsPDF
- Recommendation: rule-based weighted scoring engine in `packages/recommendation`

## Upgraded Experience Features

- Animated AI-like simulation steps during analysis
- Educational recommendation explanations for beginners and technical users
- Did-you-know learning cards
- Achievement badges, XP-ready progress, and simulation replay history
- Compatibility heatmaps, radar charts, progress bars, and scenario visualizations
- Enhanced language profiles with history, company usage, salary insight, frameworks, and learning meters

## Notes

- Docker is optional.
- PostgreSQL is optional for demo mode.
- The app can run without a database because the recommendation engine has built-in fallback data.
- Add real authentication and database persistence when preparing for final deployment.
