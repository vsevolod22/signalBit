const STRAPI_API_URL = import.meta.env.VITE_STRAPI_API_URL ?? 'http://localhost:1337';

export interface ContactRequestPayload {
  fullName: string;
  email: string;
  contactMethod: string;
  question: string;
}

export type CourseAudience = 'children' | 'adults';

export interface CourseRegistrationPayload {
  courseAudience: CourseAudience;
  courseName: 'Школа пилотирования' | 'Инженер-оператор БАС 18+';
  studentFullName: string;
  studentBirthDate: string;
  studentPhone: string;
  studentSocialLink: string;
  city: string;
  parentFullName?: string;
  parentPhone?: string;
  parentSocialLink?: string;
  personalDataConsent: boolean;
}

async function submitForm(endpoint: string, data: unknown): Promise<void> {
  const response = await fetch(`${STRAPI_API_URL}/api/${endpoint}/submit`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ data }),
  });

  if (!response.ok) {
    throw new Error('Не удалось отправить заявку. Попробуйте позже.');
  }
}

export function submitContactRequest(data: ContactRequestPayload): Promise<void> {
  return submitForm('contact-requests', data);
}

export function submitCourseRegistration(data: CourseRegistrationPayload): Promise<void> {
  return submitForm('course-registrations', data);
}
