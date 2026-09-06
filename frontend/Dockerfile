FROM node:22-alpine AS build

WORKDIR /app
RUN corepack enable

COPY package.json pnpm-lock.yaml tsconfig.json ./
RUN pnpm install --frozen-lockfile

COPY frontend ./frontend
COPY scripts/prerender-frontend.mjs ./scripts/prerender-frontend.mjs

ARG VITE_STRAPI_API_URL
ARG VITE_SITE_URL
ARG VITE_CONTACT_FORM_ENDPOINT
ARG VITE_SMARTCAPTCHA_CLIENT_KEY
ENV VITE_STRAPI_API_URL=$VITE_STRAPI_API_URL
ENV VITE_SITE_URL=$VITE_SITE_URL
ENV VITE_CONTACT_FORM_ENDPOINT=$VITE_CONTACT_FORM_ENDPOINT
ENV VITE_SMARTCAPTCHA_CLIENT_KEY=$VITE_SMARTCAPTCHA_CLIENT_KEY

RUN pnpm build:frontend

FROM nginx:1.27-alpine AS runner

COPY deploy/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist-frontend /usr/share/nginx/html

EXPOSE 80

HEALTHCHECK --interval=10s --timeout=3s --start-period=5s --retries=5 \
  CMD wget -qO- http://127.0.0.1/healthz >/dev/null || exit 1
