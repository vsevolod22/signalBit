import { useMutation } from '@tanstack/react-query';

import {
  type EducationRegistrationValues,
  educationRegistrationSchema,
  toIsoBirthDate,
} from '@/features/education/registration/model/education-registration-schema';
import { HTTP_METHOD } from '@/shared/api/http';
import { requestStrapi, STRAPI_API_URL } from '@/shared/api/strapi-client';
import { STRAPI_ENDPOINT } from '@/shared/api/strapi-endpoints';

const FORM_SUBMISSION_TIMEOUT_MS = 30_000;

interface EducationRegistrationPayload {
  courseAudience: EducationRegistrationValues['courseAudience'];
  courseName: string;
  studentFullName: string;
  studentBirthDate: string;
  studentPhone: string;
  studentSocialLink: string;
  studyPlace: string;
  city: string;
  parentFullName: string;
  parentPhone: string;
  parentSocialLink: string;
  personalDataConsent: boolean;
  smartCaptchaToken: string;
}

export interface EducationRegistrationSubmissionInput {
  smartCaptchaToken: string;
  values: EducationRegistrationValues;
}

export interface EducationRegistrationResult {
  saved: boolean;
}

export const educationRegistrationMutationKeys = {
  all: ['education-registration'] as const,
  submit: () => [...educationRegistrationMutationKeys.all, 'submit'] as const,
};

function toPayload(values: EducationRegistrationValues, smartCaptchaToken: string): EducationRegistrationPayload {
  return {
    courseAudience: values.courseAudience,
    courseName: values.courseName,
    studentFullName: values.studentFullName,
    studentBirthDate: toIsoBirthDate(values.studentBirthDate),
    studentPhone: values.studentPhone,
    studentSocialLink: values.studentSocialLink,
    studyPlace: values.studyPlace,
    city: values.city,
    parentFullName: values.parentFullName,
    parentPhone: values.parentPhone,
    parentSocialLink: values.parentSocialLink,
    personalDataConsent: values.consent,
    smartCaptchaToken,
  };
}

export async function submitEducationRegistration(
  values: EducationRegistrationValues,
  smartCaptchaToken: string,
  apiUrl = STRAPI_API_URL,
): Promise<EducationRegistrationResult> {
  const validatedValues = educationRegistrationSchema.parse(values);
  if (apiUrl === undefined) {
    throw new Error('Strapi CMS URL is not configured.');
  }

  await requestStrapi(STRAPI_ENDPOINT.COURSE_REGISTRATION_SUBMIT, {
    apiUrl,
    method: HTTP_METHOD.POST,
    body: { data: toPayload(validatedValues, smartCaptchaToken) },
    timeoutMs: FORM_SUBMISSION_TIMEOUT_MS,
  });

  return { saved: true };
}

export function useEducationRegistrationMutation(apiUrl = STRAPI_API_URL) {
  return useMutation<EducationRegistrationResult, Error, EducationRegistrationSubmissionInput>({
    mutationKey: educationRegistrationMutationKeys.submit(),
    mutationFn: ({ smartCaptchaToken, values }) => submitEducationRegistration(values, smartCaptchaToken, apiUrl),
  });
}
