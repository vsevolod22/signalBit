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

## Деплой на свой сервер

Оба сценария запускаются с локального компьютера и рассчитаны на сервер с Debian/Ubuntu. Нужны SSH-доступ под `root` или пользователем с беспарольным `sudo`, а локально — `ssh` и `rsync`. Если Docker отсутствует, скрипты установят его автоматически.

Только самостоятельный backend-репозиторий со Strapi и PostgreSQL (Strapi будет доступен на порту `1337`):

```bash
pnpm deploy:cms root@203.0.113.10 /opt/signalbit-backend https://frontend.example.ru
```

Весь проект — frontend, Strapi и PostgreSQL (сайт на порту `80`, админка по `/admin`):

```bash
pnpm deploy:stack root@203.0.113.10 /opt/signalbit http://203.0.113.10
```

Последний аргумент полного деплоя — публичный URL без завершающего `/`. Его можно не передавать: скрипт использует `http://IP_СЕРВЕРА`. Контейнер Nginx слушает HTTP-порт `80`; URL с `https://` указывайте только после настройки внешнего TLS reverse proxy.

Секреты создаются только при первом запуске и сохраняются на сервере в `backend/.env` для CMS либо в `.env.stack` для полного стека. Данные PostgreSQL и загруженные в Strapi файлы находятся в постоянных Docker volumes и сохраняются при повторных деплоях. Для SMTP заполните соответствующие переменные в серверном env-файле и снова запустите тот же скрипт.

## Env для фронта

Локально можно скопировать `.env.example` в `.env`. Для деплоя на Vercel добавь переменную:

```env
VITE_STRAPI_API_URL=https://your-strapi-domain
```

Указывай домен Strapi без `/api` в конце.
