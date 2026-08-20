FROM node:22-alpine AS deps

WORKDIR /app
RUN corepack enable

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

FROM node:22-alpine AS build

WORKDIR /app
RUN corepack enable

COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NODE_ENV=production
ENV STRAPI_TELEMETRY_DISABLED=true
RUN APP_KEYS=build_key_1,build_key_2,build_key_3,build_key_4 \
    API_TOKEN_SALT=build_api_token_salt \
    ADMIN_JWT_SECRET=build_admin_jwt_secret \
    TRANSFER_TOKEN_SALT=build_transfer_token_salt \
    JWT_SECRET=build_jwt_secret \
    ENCRYPTION_KEY=build_encryption_key \
    DATABASE_CLIENT=postgres \
    DATABASE_HOST=postgres \
    DATABASE_PORT=5432 \
    DATABASE_NAME=signalbit_cms \
    DATABASE_USERNAME=signalbit \
    DATABASE_PASSWORD=build_database_password \
    DATABASE_SSL=false \
    pnpm build

FROM node:22-alpine AS runner

WORKDIR /app
RUN corepack enable

ENV NODE_ENV=production
ENV STRAPI_TELEMETRY_DISABLED=true

COPY --from=build /app ./

EXPOSE 1337
CMD ["pnpm", "start"]
