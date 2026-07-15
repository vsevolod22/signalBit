export default ({ env }) => {
  const normalizeOrigin = (origin: string) => origin.replace(/\/+$/, '');
  const allowedOrigins = env
    .array('CORS_ORIGINS', ['http://localhost:5174', 'http://localhost:4174'])
    .map(normalizeOrigin);
  const allowVercelPreviews = env.bool('CORS_ALLOW_VERCEL_PREVIEWS', false);

  return [
    'strapi::logger',
    'strapi::errors',
    'strapi::security',
    {
      name: 'strapi::cors',
      config: {
        origin: (ctx) => {
          const requestOrigin = ctx.request.header.origin;

          if (!requestOrigin) {
            return '';
          }

          const normalizedRequestOrigin = normalizeOrigin(requestOrigin);

          if (allowedOrigins.includes('*') || allowedOrigins.includes(normalizedRequestOrigin)) {
            return normalizedRequestOrigin;
          }

          if (allowVercelPreviews && /^https:\/\/[a-z0-9-]+\.vercel\.app$/i.test(normalizedRequestOrigin)) {
            return normalizedRequestOrigin;
          }

          return '';
        },
        methods: ['GET', 'POST', 'HEAD', 'OPTIONS'],
        headers: ['Content-Type', 'Authorization', 'Origin', 'Accept'],
        keepHeaderOnError: true,
      },
    },
    'strapi::poweredBy',
    'strapi::query',
    'strapi::body',
    'strapi::session',
    {
      name: 'strapi::favicon',
      config: {
        path: '../frontend/public/favicon.ico',
      },
    },
    'strapi::public',
  ];
};
