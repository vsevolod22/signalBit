import { factories } from '@strapi/strapi';

import { FORM_REQUEST_SOURCE } from '../../../shared/forms';
import { getRequestData, normalizeString } from '../../../shared/request-data';

const requiredFields = ['fullName', 'contactMethod', 'question'] as const;

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

    const entry = await strapi.entityService.create('api::contact-request.contact-request', { data });

    ctx.body = { data: { id: entry.id } };
  },
}));
