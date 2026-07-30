import { factories } from '@strapi/strapi';

import { FORM_REQUEST_SOURCE } from '../../../shared/forms';
import { getRequestData, normalizeString } from '../../../shared/request-data';

const requiredFields = ['fullName', 'contactMethod', 'question'] as const;

interface ContactRequestData {
  contactMethod: string;
  email: string;
  fullName: string;
  question: string;
  source: string;
}

interface ContactSetting {
  emailAddress?: string;
}

async function sendContactRequestEmail(strapi, data: ContactRequestData): Promise<void> {
  const contactSetting = (await strapi.entityService.findMany('api::contact-setting.contact-setting', {
    fields: ['emailAddress'],
  })) as ContactSetting | null;
  const recipient = contactSetting?.emailAddress?.trim();

  if (!recipient) {
    throw new Error('Contact notification recipient is not configured.');
  }

  const replyTo = data.email.trim() || undefined;
  const text = [
    'Новая заявка с сайта СИГНАЛ-БИТ',
    '',
    `ФИО: ${data.fullName}`,
    `Почта: ${data.email || 'не указана'}`,
    `Способ связи: ${data.contactMethod}`,
    '',
    'Вопрос:',
    data.question,
  ].join('\n');

  await strapi.plugin('email').service('email').send({
    to: recipient,
    replyTo,
    subject: 'Новая заявка с сайта СИГНАЛ-БИТ',
    text,
  });
}

export default factories.createCoreController('api::contact-request.contact-request', ({ strapi }) => ({
  async submit(ctx) {
    const body = getRequestData(ctx);
    const data = {
      fullName: normalizeString(body.fullName),
      email: normalizeString(body.email),
      contactMethod: normalizeString(body.contactMethod),
      question: normalizeString(body.question),
      source: FORM_REQUEST_SOURCE,
    };

    const missingField = requiredFields.find((field) => data[field].length === 0);

    if (missingField) {
      return ctx.badRequest(`Missing required field: ${missingField}`);
    }

    const entry = await strapi.entityService.create('api::contact-request.contact-request', {
      data: { ...data, emailNotificationSent: false },
    });
    let emailNotificationSent = false;

    try {
      await sendContactRequestEmail(strapi, data);
      emailNotificationSent = true;
      await strapi.entityService.update('api::contact-request.contact-request', entry.id, {
        data: { emailNotificationSent: true, emailNotificationError: null },
      });
    } catch (error: unknown) {
      const emailNotificationError = error instanceof Error ? error.message : 'Unknown email delivery error.';
      strapi.log.error('Failed to send contact request notification email.', error);
      await strapi.entityService.update('api::contact-request.contact-request', entry.id, {
        data: { emailNotificationSent: false, emailNotificationError },
      });
    }

    ctx.body = { data: { id: entry.id, emailNotificationSent } };
  },
}));
