# SignalBit CMS

Strapi backend for editable website content: hero texts, activity fields, services, products, about company, achievements, contacts, navigation, and footer.

## Start locally

1. Copy `backend/.env.example` to `backend/.env` and replace the `change_me_*` secrets.
2. Start PostgreSQL from the repository root: `pnpm db:up`.
3. Install backend dependencies: `pnpm --dir backend install`.
4. Run Strapi: `pnpm backend:dev`.
5. Open `http://localhost:1337/admin` and create the admin user.

The first backend start seeds current text content into CMS entries. Media fields are created in schemas, but images and video should be uploaded through the Strapi admin panel.

To import the frontend fallback images and video into the local Strapi Media Library and attach them to CMS entries, run from the repository root:

```bash
pnpm backend:import-media
```

## Deploy to server

The production deploy uses Docker Compose with PostgreSQL and Strapi containers.

```bash
pnpm deploy:cms user@server /opt/signalbit
```

Requirements on the server: Docker and Docker Compose plugin. The script creates `backend/.env` on the server if it does not exist, generates secrets, builds the Strapi image, starts PostgreSQL and exposes Strapi at `http://server:1337/admin`.

## Env for Strapi Cloud and Vercel

For a test deploy through Strapi Cloud, add these variables in the Strapi Cloud project settings:

```env
APP_KEYS=change_me_1,change_me_2,change_me_3,change_me_4
API_TOKEN_SALT=change_me_api_token_salt
ADMIN_JWT_SECRET=change_me_admin_jwt_secret
TRANSFER_TOKEN_SALT=change_me_transfer_token_salt
JWT_SECRET=change_me_jwt_secret
ENCRYPTION_KEY=change_me_encryption_key
STRAPI_TELEMETRY_DISABLED=true
CORS_ORIGINS=http://localhost:5173,http://localhost:4173,https://your-vercel-project.vercel.app
CORS_ALLOW_VERCEL_PREVIEWS=false
```

Replace every `change_me_*` value with a strong secret. `APP_KEYS` must contain four comma-separated secrets.

`CORS_ORIGINS` is a comma-separated allowlist. Add the final Vercel production domain and any preview domains that should be allowed to call Strapi.

Set `CORS_ALLOW_VERCEL_PREVIEWS=true` only if you want to allow all `*.vercel.app` preview deployments during testing.

In Vercel, add this frontend variable:

```env
VITE_STRAPI_API_URL=https://your-strapi-domain
```

Use the Strapi Cloud public domain without `/api` at the end.

If you deploy Strapi with the Docker Compose setup instead of Strapi Cloud, also provide the database variables from `backend/.env.example`. For this repository's compose file, `DATABASE_HOST` should be `postgres` in production Docker and `localhost` for local development.
