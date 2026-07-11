import { z } from 'zod';

const PHONE_PATTERN = /^[+\d][\d\s()-]{6,19}$/;

function isValidOptionalPhone(value: string): boolean {
  const isPhoneEmpty = value.length === 0;
  return isPhoneEmpty || PHONE_PATTERN.test(value);
}

export const contactFormSchema = z.object({
  name: z.string().trim().min(2, 'Укажите имя — минимум 2 символа.').max(80, 'Имя не должно быть длиннее 80 символов.'),
  email: z.string().trim().min(1, 'Укажите электронную почту.').email('Введите корректный email.'),
  phone: z
    .string()
    .trim()
    .max(24, 'Телефон не должен быть длиннее 24 символов.')
    .refine(isValidOptionalPhone, 'Введите телефон в международном формате.'),
  subject: z.string().trim().min(3, 'Укажите тему обращения.').max(120, 'Тема не должна быть длиннее 120 символов.'),
  message: z
    .string()
    .trim()
    .min(20, 'Опишите задачу подробнее — минимум 20 символов.')
    .max(2000, 'Сообщение не должно быть длиннее 2000 символов.'),
  consent: z.boolean().refine((value) => value, 'Необходимо согласие на обработку данных.'),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
