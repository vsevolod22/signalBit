import { describe, expect, it } from 'vitest';

import { contactFormSchema } from './contact-form-schema';

const validValues = {
  name: 'Иван Петров',
  email: 'ivan@example.com',
  phone: '+7 900 123-45-67',
  subject: 'Разработка системы управления',
  message: 'Нужна консультация по разработке системы управления беспилотным аппаратом.',
  consent: true,
};

describe('contactFormSchema', () => {
  it('принимает корректно заполненную форму', () => {
    expect(contactFormSchema.safeParse(validValues).success).toBe(true);
  });

  it('отклоняет некорректный email и короткое сообщение', () => {
    const result = contactFormSchema.safeParse({
      ...validValues,
      email: 'invalid-email',
      message: 'Коротко',
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      const fields = result.error.flatten().fieldErrors;
      expect(fields.email).toBeDefined();
      expect(fields.message).toBeDefined();
    }
  });

  it('разрешает не указывать телефон', () => {
    expect(contactFormSchema.safeParse({ ...validValues, phone: '' }).success).toBe(true);
  });

  it('требует явного согласия на обработку данных', () => {
    const result = contactFormSchema.safeParse({ ...validValues, consent: false });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.flatten().fieldErrors.consent).toBeDefined();
    }
  });
});
