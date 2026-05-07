import { z } from 'zod';

const requiredString = (message: string) => z.string().trim().min(1, message);

const optionalEmail = z
  .string()
  .trim()
  .refine((value) => value.length === 0 || z.email().safeParse(value).success, {
    message: 'Введите корректную почту',
  });

export const contactRequestSchema = z.object({
  fullName: requiredString('Укажите, как к вам обращаться'),
  email: optionalEmail,
  contactMethod: requiredString('Укажите способ связи'),
  question: requiredString('Опишите вопрос'),
});

export const courseAudiences = ['children', 'adults'] as const;
export const courseNames = ['Школа пилотирования', 'Инженер-оператор БАС 18+'] as const;

const courseNameByAudience = {
  children: 'Школа пилотирования',
  adults: 'Инженер-оператор БАС 18+',
} as const;

export const courseRegistrationSchema = z
  .object({
    courseAudience: z.enum(courseAudiences, 'Выберите категорию курса'),
    courseName: z.enum(courseNames, 'Выберите курс'),
    studentFullName: requiredString('Укажите ФИО ученика'),
    studentBirthDate: requiredString('Укажите дату рождения ученика'),
    studentPhone: requiredString('Укажите телефон ученика'),
    studentSocialLink: requiredString('Укажите Telegram/VK ученика'),
    city: requiredString('Укажите город проживания'),
    parentFullName: z.string().trim(),
    parentPhone: z.string().trim(),
    parentSocialLink: z.string().trim(),
    personalDataConsent: z.literal(true, 'Необходимо согласие на обработку данных'),
  })
  .superRefine((data, context) => {
    if (data.courseName !== courseNameByAudience[data.courseAudience]) {
      context.addIssue({
        code: 'custom',
        path: ['courseName'],
        message:
          data.courseAudience === 'children'
            ? 'Для детских курсов доступна только школа пилотирования'
            : 'Для взрослых курсов доступен только Инженер-оператор БАС 18+',
      });
    }

    if (data.courseAudience !== 'children') {
      return;
    }

    if (data.parentFullName.length === 0) {
      context.addIssue({
        code: 'custom',
        path: ['parentFullName'],
        message: 'Укажите ФИО родителя ученика',
      });
    }

    if (data.parentPhone.length === 0) {
      context.addIssue({
        code: 'custom',
        path: ['parentPhone'],
        message: 'Укажите телефон родителя ученика',
      });
    }

    if (data.parentSocialLink.length === 0) {
      context.addIssue({
        code: 'custom',
        path: ['parentSocialLink'],
        message: 'Укажите Telegram/VK родителя ученика',
      });
    }
  });

export type ContactRequestFormData = z.infer<typeof contactRequestSchema>;
export type CourseRegistrationFormData = z.infer<typeof courseRegistrationSchema>;

export type FieldErrors<T extends string> = Partial<Record<T, string>>;

export function getFieldErrors<T extends string>(error: z.ZodError): FieldErrors<T> {
  const fieldErrors: FieldErrors<T> = {};

  for (const issue of error.issues) {
    const fieldName = issue.path[0];

    if (typeof fieldName === 'string' && fieldErrors[fieldName as T] === undefined) {
      fieldErrors[fieldName as T] = issue.message;
    }
  }

  return fieldErrors;
}
