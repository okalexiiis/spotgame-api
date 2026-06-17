# GameSpot API — Developer Guide

This document covers everything you need to know to develop, maintain, and interact with the Game Spotlight API.

---

## 🚀 1. Getting Started

### Prerequisites
- **Node.js** (v20+)
- **pnpm** (v10+)
- **Docker** & **Docker Compose**

### Environment Setup
1. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```
2. Fill in your **Cloudflare R2** credentials in `.env`.
3. Note: The local database runs on port **5433** to avoid conflicts with existing Postgres instances.

### Installation
```bash
pnpm install
```

---

## 🗄️ 2. Database Management

### Infrastructure (PostgreSQL)
Start the local database container:
```bash
pnpm run db:up
```

### Migrations
Apply schema changes to the database:
```bash
pnpm run prisma:migrate
```

### Seeding
Populate the database with foundational catalogs and sample data (Admin user, Elden Ring game, sample news):
```bash
npx prisma db seed
```
*Note: Seeds use placeholder URLs for images and videos, so no real R2 uploads are required.*

### Inspection
Open **Prisma Studio** to view and edit data in your browser:
```bash
pnpm run prisma:studio
```

---

## ☁️ 3. Cloudflare R2 Upload Flow

This API uses a **"Lazy Upload" (Pre-signed URLs)** strategy. The server does not handle the file buffer; the client uploads directly to Cloudflare R2.

### Step-by-Step Workflow:
1.  **Request a Pre-signed URL:**
    The client calls `POST /api/v1/upload/presign` (Authenticated).
    - **Payload:** `{ "filename": "trailer.mp4", "contentType": "video/mp4", "folder": "trailers/videos" }`
    - **Response:** 
      ```json
      {
        "presignedUrl": "https://<bucket>.r2.cloudflarestorage.com/...",
        "publicUrl": "https://pub-<id>.r2.dev/trailers/videos/<uuid>.mp4",
        "storageKey": "trailers/videos/<uuid>.mp4"
      }
      ```
2.  **Upload the File:**
    The client performs a `PUT` request directly to the `presignedUrl` with the file buffer in the body.
3.  **Persist in DB:**
    The client sends the `publicUrl` (and optionally `storageKey`) to the respective CRUD endpoint (e.g., `POST /api/v1/trailers`).

---

## 🎬 4. Video Reproduction

Videos uploaded to R2 are accessible via the `publicUrl` returned during the presign step.

- **To reproduce a video:** Simply use the `urlVideo` (from the Trailer entity) in any standard HTML5 `<video>` tag or a streaming library like `Video.js`.
- **Public Domain:** Ensure your R2 Bucket has a "Public Domain" or "Custom Domain" enabled in the Cloudflare Dashboard.

---

## 🛠️ 5. Key API Endpoints

Full documentation is available at `http://localhost:3000/api-docs`.

### Authentication
- `POST /auth/register`: Create account.
- `POST /auth/login`: Get Bearer token.
- `POST /qr-login/generate`: TV login code.

### Core Resources
- `/juegos`: Game metadata and management.
- `/noticias`: Platform news and image galleries.
- `/trailers`: Video trailers and metadata.

### User Context (`/me`)
- `/me/configuracion`: User settings.
- `/me/favoritos`: Favorite games.
- `/me/notificaciones`: User alerts.

---

## 🛡️ 6. Error Handling

The API uses a **Global Error Handler**. 
- **Prisma Errors:** Automatically mapped to `409` (Conflict) or `404` (Not Found).
- **Validation Errors:** Returns `400` with a detailed list of path-specific Zod errors.
- **Async Errors:** Handled natively by Express 5.
