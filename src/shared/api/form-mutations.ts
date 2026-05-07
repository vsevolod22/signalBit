import { useMutation } from '@tanstack/react-query';

import type { ContactRequestPayload, CourseRegistrationPayload } from './strapi-forms';
import { submitContactRequest, submitCourseRegistration } from './strapi-forms';

export const formMutationKeys = {
  all: ['forms'] as const,
  contactRequest: () => [...formMutationKeys.all, 'contact-request'] as const,
  courseRegistration: () => [...formMutationKeys.all, 'course-registration'] as const,
};

export function useContactRequestMutation() {
  return useMutation({
    mutationKey: formMutationKeys.contactRequest(),
    mutationFn: (payload: ContactRequestPayload) => submitContactRequest(payload),
  });
}

export function useCourseRegistrationMutation() {
  return useMutation({
    mutationKey: formMutationKeys.courseRegistration(),
    mutationFn: (payload: CourseRegistrationPayload) => submitCourseRegistration(payload),
  });
}
