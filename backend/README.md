# SignalBit CMS

Strapi backend for editable website content: hero texts, activity fields, services, products, about company, achievements, contacts, navigation, and footer.

## Start locally

1. Copy `backend/.env.example` to `backend/.env` and replace the `change_me_*` secrets.
2. Start PostgreSQL from the repository root: `pnpm db:up`.
3. Install backend dependencies: `pnpm --dir backend install`.
4. Run Strapi: `pnpm backend:dev`.
5. Open `http://localhost:1337/admin` and create the admin user.

The first backend start seeds current text content into CMS entries. Media fields are created in schemas, but images and video should be uploaded through the Strapi admin panel.

## Deploy to server

The production deploy uses Docker Compose with PostgreSQL and Strapi containers.

```bash
pnpm deploy:cms user@server /opt/signalbit
```

Requirements on the server: Docker and Docker Compose plugin. The script creates `backend/.env` on the server if it does not exist, generates secrets, builds the Strapi image, starts PostgreSQL and exposes Strapi at `http://server:1337/admin`.
