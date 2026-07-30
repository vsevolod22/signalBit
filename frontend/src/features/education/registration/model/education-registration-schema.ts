import { z } from 'zod';

export const COURSE_AUDIENCE = {
  CHILDREN: 'children',
  ADULTS: 'adults',
} as const;

export type CourseAudience = (typeof COURSE_AUDIENCE)[keyof typeof COURSE_AUDIENCE];

export const COURSE_NAME_BY_AUDIENCE: Record<CourseAudience, string> = {
  children: 'Школа пилотирования',
  adults: 'Инженер-оператор БАС 18+',
};

const PHONE_PATTERN = /^[+\d][\d\s()-]{6,19}$/;
const BIRTH_DATE_PATTERN = /^(\d{2})\.(\d{2})\.(\d{4})$/;

function isValidHttpsUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === 'https:' && url.hostname.includes('.');
  } catch {
    return false;
  }
}

function isValidBirthDate(value: string): boolean {
  const match = BIRTH_DATE_PATTERN.exec(value);
  if (match === null) {
    return false;
  }

  const [, dayText, monthText, yearText] = match;
  const day = Number(dayText);
  const month = Number(monthText);
  const year = Number(yearText);
  const date = new Date(Date.UTC(year, month - 1, day));
  const today = new Date();

  return (
    date.getUTCFullYear() === year &&
    date.getUTCMonth() === month - 1 &&
    date.getUTCDate() === day &&
    date.getTime() <= today.getTime()
  );
}

export function toIsoBirthDate(value: string): string {
  const match = BIRTH_DATE_PATTERN.exec(value);
  if (match === null) {
    return value;
  }

  const [, day, month, year] = match;
  return `${year}-${month}-${day}`;
}

export const educationRegistrationSchema = z
  .object({
    courseAudience: z.enum([COURSE_AUDIENCE.CHILDREN, COURSE_AUDIENCE.ADULTS]),
    courseName: z.string().trim().min(1),
    studentFullName: z
      .string()
      .trim()
      .min(3, 'Укажите ФИО обучающегося.')
      .max(160, 'ФИО не должно быть длиннее 160 символов.'),
    studentBirthDate: z.string().trim().refine(isValidBirthDate, 'Введите корректную дату в формате дд.мм.гггг.'),
    studentPhone: z
      .string()
      .trim()
      .refine((value) => PHONE_PATTERN.test(value), 'Введите корректный номер телефона.'),
    studentSocialLink: z
      .string()
      .trim()
      .refine(isValidHttpsUrl, 'Введите полную ссылку на Telegram или ВК.')
      .max(300, 'Ссылка слишком длинная.'),
    studyPlace: z.string().trim().max(500, 'Описание места обучения слишком длинное.'),
    city: z.string().trim().max(120, 'Название города слишком длинное.'),
    parentFullName: z.string().trim().max(160, 'ФИО не должно быть длиннее 160 символов.'),
    parentPhone: z.string().trim().max(24, 'Номер телефона слишком длинный.'),
    parentSocialLink: z.string().trim().max(300, 'Ссылка слишком длинная.'),
    consent: z.boolean().refine((value) => value, 'Необходимо согласие на обработку персональных данных.'),
  })
  .superRefine((values, context) => {
    if (values.courseAudience === COURSE_AUDIENCE.CHILDREN) {
      if (values.studyPlace.length < 5) {
        context.addIssue({ code: 'custom', path: ['studyPlace'], message: 'Укажите место обучения обучающегося.' });
      }
      if (values.parentFullName.length < 3) {
        context.addIssue({
          code: 'custom',
          path: ['parentFullName'],
          message: 'Укажите ФИО родителя или законного представителя.',
        });
      }
      if (!PHONE_PATTERN.test(values.parentPhone)) {
        context.addIssue({
          code: 'custom',
          path: ['parentPhone'],
          message: 'Введите корректный номер телефона родителя.',
        });
      }
      if (!isValidHttpsUrl(values.parentSocialLink)) {
        context.addIssue({
          code: 'custom',
          path: ['parentSocialLink'],
          message: 'Введите полную ссылку на Telegram или ВК родителя.',
        });
      }
    }

    if (values.courseAudience === COURSE_AUDIENCE.ADULTS && values.city.length < 2) {
      context.addIssue({ code: 'custom', path: ['city'], message: 'Укажите город проживания.' });
    }
  });

export type EducationRegistrationValues = z.infer<typeof educationRegistrationSchema>;

export function createEducationRegistrationDefaults(audience: CourseAudience): EducationRegistrationValues {
  return {
    courseAudience: audience,
    courseName: COURSE_NAME_BY_AUDIENCE[audience],
    studentFullName: '',
    studentBirthDate: '',
    studentPhone: '+7',
    studentSocialLink: 'https://',
    studyPlace: '',
    city: '',
    parentFullName: '',
    parentPhone: '+7',
    parentSocialLink: 'https://',
    consent: false,
  };
}
