import { factories } from '@strapi/strapi';

const requiredFields = ['fullName', 'contactMethod', 'question'] as const;

function getRequestData(ctx) {
  return ctx.request.body?.data ?? ctx.request.body ?? {};
}

function normalizeString(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

export default factories.createCoreController('api::contact-request.contact-request', ({ strapi }) => ({
  async submit(ctx) {
    const body = getRequestData(ctx);
    const data = {
      fullName: normalizeString(body.fullName),
      email: normalizeString(body.email),
      contactMethod: normalizeString(body.contactMethod),
      question: normalizeString(body.question),
      source: 'site',
    };

    const missingField = requiredFields.find((field) => data[field].length === 0);

    if (missingField) {
      return ctx.badRequest(`Missing required field: ${missingField}`);
    }

    const entry = await strapi.entityService.create('api::contact-request.contact-request', { data });

    ctx.body = { data: { id: entry.id } };
  },
}));
