# Project Tinubu Legacy Archive (PTLA)

Nigeria's first centralized digital archive documenting every verified Federal Government project, programme, and intervention from 2023–2030.

## Tech Stack

- **Framework:** Next.js 15 (App Router) + React 19
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4 + Glassmorphism
- **UI Components:** Shadcn UI + Radix UI
- **Animations:** Framer Motion
- **Maps:** React Leaflet
- **Charts:** Recharts
- **Database:** PostgreSQL + Prisma ORM
- **Auth:** NextAuth.js
- **Media:** Cloudinary
- **Deployment:** Vercel

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database

### Installation

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Generate Prisma client
npm run db:generate

# Push database schema
npm run db:push

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Admin Access

- URL: `/admin`
- Demo credentials: `admin@ptla.gov.ng` / `admin123`

## Features

- **Homepage** — Full-screen hero with animated Nigerian flag, live statistics
- **Project Database** — Searchable, filterable project listings with detail pages
- **Interactive Map** — Clickable Nigeria map with state-level project data
- **Sectors** — 12 sector categories with project breakdowns
- **Media Gallery** — Masonry layout with lazy loading
- **Timeline** — Interactive horizontal timeline (2023–2030)
- **Dashboard** — Analytics with charts and metrics
- **Reports** — Downloadable PDF, Excel, CSV reports
- **Admin Panel** — Secure authentication with role-based access
- **Public Feedback** — Citizen engagement portal
- **Dark Mode** — System-aware theme switching
- **Multilingual** — English, Hausa, Yoruba, Igbo support (UI ready)
- **PWA** — Progressive Web App with offline support

## Project Structure

```
src/
├── app/                  # Next.js App Router pages
│   ├── page.tsx          # Homepage
│   ├── projects/         # Project database
│   ├── map/              # Interactive map
│   ├── sectors/          # Sector pages
│   ├── gallery/          # Media gallery
│   ├── timeline/         # Development timeline
│   ├── dashboard/        # Analytics dashboard
│   ├── reports/          # Report downloads
│   ├── about/            # About page
│   ├── contact/          # Contact page
│   └── admin/            # Admin panel
├── components/
│   ├── ui/               # Shadcn UI components
│   ├── layout/           # Header, footer, search
│   ├── home/             # Homepage sections
│   ├── animations/       # Framer Motion wrappers
│   └── ...               # Feature components
├── lib/                  # Utilities, constants, auth
├── types/                # TypeScript types
└── prisma/               # Database schema
```

## Design System

| Token | Value |
|-------|-------|
| Primary | `#006B3C` (Deep Green) |
| Background | `#F7F9FB` |
| Text | `#1A1A1A` |
| Style | Glassmorphism, rounded corners, soft shadows |

## License

© 2025 Federal Republic of Nigeria. All rights reserved.
