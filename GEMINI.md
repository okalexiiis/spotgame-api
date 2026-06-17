# GameSpot API

A robust RESTful API for "Game Spotlight", a platform for tracking video game launches, trailers, and news.

## Project Overview

- **Runtime:** Node.js (v20+ recommended)
- **Framework:** Express.js (v5.x)
- **Language:** TypeScript
- **ORM:** Prisma
- **Database:** PostgreSQL
- **Architecture:** Monolithic REST API with a focus on game metadata, user management, and trailer moderation.

## Tech Stack

- **Core:** `express`, `cors`, `helmet`, `morgan`
- **Database:** `@prisma/client`, `prisma`
- **Development:** `typescript`, `ts-node-dev`, `rimraf`, `dotenv`

## Getting Started

### Prerequisites

- [pnpm](https://pnpm.io/) (Project uses pnpm v10)
- [Docker](https://www.docker.com/) (For running PostgreSQL via `docker-compose`)

### Installation

```bash
pnpm install
```

### Environment Setup

Create a `.env` file in the root directory (refer to `.env.example` if available, or initialize with `DATABASE_URL`).

### Database Initialization

```bash
# Start PostgreSQL container
pnpm run db:up

# Generate Prisma Client
pnpm run prisma:generate

# Run migrations
pnpm run prisma:migrate
```

### Development

```bash
pnpm run dev
```

The server will be available at `http://localhost:3000`.

## Building and Running

- **Build:** `pnpm run build` (Outputs to `dist/`)
- **Start Production:** `pnpm run start`

## Project Structure

- `src/`: Source code
  - `index.ts`: Entry point, starts the server.
  - `app.ts`: Express application configuration (middleware, health check).
  - `lib/`: Shared utilities and library initializations (e.g., `prisma.ts`).
- `prisma/`: Database schema and migrations.
- `docker-compose.yml`: Local infrastructure definition (PostgreSQL).

## Development Conventions

- **Database Naming:** 
  - Prisma models use **PascalCase** in Spanish (e.g., `Usuario`, `Juego`).
  - Physical table and column names use **snake_case** and are mapped using `@@map` and `@map`.
- **API Standards:**
  - Health check endpoint available at `/health`.
  - Uses `helmet` for security headers and `morgan` for request logging.
- **Lazy Development (Ponytail):**
  - Prefer the standard library or existing dependencies over custom abstractions.
  - Keep the codebase minimal and direct.
  - Use `ponytail:` comments to mark intentional shortcuts or simplifications.

## Prisma Schema Highlights

The database includes 21+ tables covering:
- **Catalogs:** Roles, Languages, Platforms, Genres.
- **Users:** Profiles, Sessions, Notifications, Activity Logs, Settings.
- **Content:** Games, Trailers (with moderation), News, Upcoming Launches.
- **Features:** Favorites, Downloads, Reservations, QR Login.
