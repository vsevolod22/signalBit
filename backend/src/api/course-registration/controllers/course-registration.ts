import { factories } from '@strapi/strapi';

import { FORM_REQUEST_SOURCE } from '../../../shared/forms';
import { getRequestData, normalizeString } from '../../../shared/request-data';

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

function isCourseAudience(value: string): value is CourseAudience {
  return value === 'children' || value === 'adults';
}

function isCourseName(value: string): value is CourseName {
  return value === 'Школа пилотирования' || value === 'Инженер-оператор БАС 18+';
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
        source: FORM_REQUEST_SOURCE,
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

      const expectedCourseName = courseNameByAudience[data.courseAudience];
      const isCourseSelectionMismatch = data.courseName !== expectedCourseName;
      if (isCourseSelectionMismatch) {
        return ctx.badRequest('Course name does not match selected course audience');
      }

      if (!data.personalDataConsent) {
        return ctx.badRequest('Personal data consent is required');
      }

      const isChildrenCourse = data.courseAudience === 'children';
      if (isChildrenCourse) {
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
        },
      });

      ctx.body = { data: { id: entry.id } };
    },
  })
);
