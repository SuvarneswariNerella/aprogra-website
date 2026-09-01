import type { Core } from '@strapi/strapi';

const config = ({ env }: Core.Config.Shared.ConfigParams): Core.Config.Admin => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET')!,
  },
  apiToken: {
    salt: env('API_TOKEN_SALT')!,
  },
  transfer: {
    token: {
      salt: env('TRANSFER_TOKEN_SALT')!,
    },
  },
  secrets: {
    encryptionKey: env('ENCRYPTION_KEY')!,
  },
  flags: {
    nps: env.bool('FLAG_NPS', true),
    promoteEE: env.bool('FLAG_PROMOTE_EE', true),
    docLinks: env.bool('FLAG_DOC_LINKS', true),
  },
  preview: {
    enabled: true,
    config: {
      allowedOrigins: [
        env('CLIENT_URL', 'http://localhost:3000'),
        'http://localhost:3000',
        'http://localhost:5173',
        'http://127.0.0.1:3000',
        'http://127.0.0.1:5173',
      ],
      async handler(uid, { documentId, locale, status }) {
        const clientUrl = env('CLIENT_URL', 'http://localhost:3000').replace(/\/$/, '');
        const secret = env('PREVIEW_SECRET', 'my-super-secret-key');
        const serverUrl = env('SERVER_URL', env('PUBLIC_URL', ''));
        const apiParam = serverUrl ? `&apiUrl=${encodeURIComponent(serverUrl)}` : '';
        return `${clientUrl}/preview?secret=${secret}&uid=${uid}&documentId=${documentId}&status=${status}${apiParam}`;
      },
    },
  },
});

export default config;
