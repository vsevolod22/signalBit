# SignalBit Site

React-приложение на Vite и TypeScript.

## Команды

```bash
pnpm install
pnpm dev
pnpm build
pnpm test
```

- `pnpm dev` запускает локальный Vite-сервер.
- `pnpm build` выполняет проверку TypeScript и production-сборку.
- `pnpm test` запускает Vitest.

## Env для фронта

Локально можно скопировать `.env.example` в `.env`. Для деплоя на Vercel добавь переменную:

```env
VITE_STRAPI_API_URL=https://your-strapi-domain
```

Указывай домен Strapi без `/api` в конце.
