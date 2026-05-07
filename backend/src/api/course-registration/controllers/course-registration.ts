import { factories } from '@strapi/strapi';

const commonRequiredFields = [
  'courseAudience',
  'courseName',
  'studentFullName',
  'studentBirthDate',
  'studentPhone',
  'studentSocialLink',
  'city',
] as const;

const parentRequiredFields = ['parentFullName', 'parentPhone', 'parentSocialLink'] as const;
const courseAudiences = ['children', 'adults'] as const;
const courseNames = ['Школа пилотирования', 'Инженер-оператор БАС 18+'] as const;
const courseNameByAudience = {
  children: 'Школа пилотирования',
  adults: 'Инженер-оператор БАС 18+',
} as const;
const courseAudienceLabelByValue = {
  children: 'Детские курсы',
  adults: 'Взрослые курсы',
} as const;

type CourseAudience = (typeof courseAudiences)[number];
type CourseName = (typeof courseNames)[number];

function getRequestData(ctx) {
  return ctx.request.body?.data ?? ctx.request.body ?? {};
}

function normalizeString(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

function isCourseAudience(value: string): value is CourseAudience {
  return courseAudiences.includes(value as CourseAudience);
}

function isCourseName(value: string): value is CourseName {
  return courseNames.includes(value as CourseName);
}

export default factories.createCoreController(
  'api::course-registration.course-registration',
  ({ strapi }) => ({
    async submit(ctx) {
      const body = getRequestData(ctx);
      const data = {
        courseAudience: normalizeString(body.courseAudience),
        courseName: normalizeString(body.courseName),
        studentFullName: normalizeString(body.studentFullName),
        studentBirthDate: normalizeString(body.studentBirthDate),
        studentPhone: normalizeString(body.studentPhone),
        studentSocialLink: normalizeString(body.studentSocialLink),
        city: normalizeString(body.city),
        parentFullName: normalizeString(body.parentFullName),
        parentPhone: normalizeString(body.parentPhone),
        parentSocialLink: normalizeString(body.parentSocialLink),
        personalDataConsent: body.personalDataConsent === true,
        source: 'Сайт',
      };

      const missingCommonField = commonRequiredFields.find((field) => data[field].length === 0);

      if (missingCommonField) {
        return ctx.badRequest(`Missing required field: ${missingCommonField}`);
      }

      if (!isCourseAudience(data.courseAudience)) {
        return ctx.badRequest('Invalid course audience');
      }

      if (!isCourseName(data.courseName)) {
        return ctx.badRequest('Invalid course name');
      }

      if (data.courseName !== courseNameByAudience[data.courseAudience]) {
        return ctx.badRequest('Course name does not match selected course audience');
      }

      if (!data.personalDataConsent) {
        return ctx.badRequest('Personal data consent is required');
      }

      if (data.courseAudience === 'children') {
        const missingParentField = parentRequiredFields.find((field) => data[field].length === 0);

        if (missingParentField) {
          return ctx.badRequest(`Missing required field: ${missingParentField}`);
        }
      }

      const entry = await strapi.entityService.create('api::course-registration.course-registration', {
        data: {
          ...data,
          courseAudience: courseAudienceLabelByValue[data.courseAudience],
          courseName: data.courseName,
        } as any,
      });

      ctx.body = { data: { id: entry.id } };
    },
  })
);
