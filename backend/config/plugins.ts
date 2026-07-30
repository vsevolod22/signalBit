export default ({ env }) => {
  const smtpHost = env('SMTP_HOST');

  if (!smtpHost) {
    return {};
  }

  const smtpUsername = env('SMTP_USERNAME', '');

  return {
    email: {
      config: {
        provider: 'nodemailer',
        providerOptions: {
          host: smtpHost,
          port: env.int('SMTP_PORT', 465),
          secure: env.bool('SMTP_SECURE', true),
          auth: {
            user: smtpUsername,
            pass: env('SMTP_PASSWORD'),
          },
        },
        settings: {
          defaultFrom: env('SMTP_FROM', smtpUsername),
          defaultReplyTo: env('SMTP_REPLY_TO', smtpUsername),
        },
      },
    },
  };
};
