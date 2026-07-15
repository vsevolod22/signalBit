export default ({ env }) => ({
  locales: ['ru'],
  auth: {
    secret: env('ADMIN_JWT_SECRET'),
    sessions: {
      maxRefreshTokenLifespan: env.int('ADMIN_MAX_REFRESH_TOKEN_LIFESPAN', 30 * 24 * 60 * 60),
      maxSessionLifespan: env.int('ADMIN_MAX_SESSION_LIFESPAN', 24 * 60 * 60),
    },
  },
  secrets: {
    encryptionKey: env('ENCRYPTION_KEY'),
  },
  apiToken: {
    salt: env('API_TOKEN_SALT'),
  },
  transfer: {
    token: {
      salt: env('TRANSFER_TOKEN_SALT'),
    },
  },
});
