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
] as const;

const childrenRequiredFields = ['studyPlace', 'parentFullName', 'parentPhone', 'parentSocialLink'] as const;
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

interface ContactSetting {
  emailAddress?: string;
}

interface CourseRegistrationData {
  courseAudience: CourseAudience;
  courseName: CourseName;
  studentFullName: string;
  studentBirthDate: string;
  studentPhone: string;
  studentSocialLink: string;
  city: string;
  studyPlace: string;
  parentFullName: string;
  parentPhone: string;
  parentSocialLink: string;
  personalDataConsent: boolean;
  source: string;
}

function isCourseAudience(value: string): value is CourseAudience {
  return value === 'children' || value === 'adults';
}

function isCourseName(value: string): value is CourseName {
  return value === 'Школа пилотирования' || value === 'Инженер-оператор БАС 18+';
}

async function sendCourseRegistrationEmail(strapi, data: CourseRegistrationData): Promise<void> {
  const contactSetting = (await strapi.entityService.findMany('api::contact-setting.contact-setting', {
    fields: ['emailAddress'],
  })) as ContactSetting | null;
  const recipient = contactSetting?.emailAddress?.trim();

  if (!recipient) {
    throw new Error('Course registration notification recipient is not configured.');
  }

  const isChildrenCourse = data.courseAudience === 'children';
  const conditionalLines = isChildrenCourse
    ? [
        `Место обучения: ${data.studyPlace}`,
        `ФИО родителя/представителя: ${data.parentFullName}`,
        `Телефон родителя/представителя: ${data.parentPhone}`,
        `Telegram/ВК родителя/представителя: ${data.parentSocialLink}`,
      ]
    : [`Город проживания: ${data.city}`];
  const text = [
    'Новая регистрация на обучение с сайта СИГНАЛ-БИТ',
    '',
    `Курс: ${data.courseName}`,
    `ФИО обучающегося: ${data.studentFullName}`,
    `Дата рождения: ${data.studentBirthDate}`,
    `Телефон обучающегося: ${data.studentPhone}`,
    `Telegram/ВК обучающегося: ${data.studentSocialLink}`,
    ...conditionalLines,
  ].join('\n');

  await strapi.plugin('email').service('email').send({
    to: recipient,
    subject: `Регистрация на курс: ${data.courseName}`,
    text,
  });
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
        studyPlace: normalizeString(body.studyPlace),
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

      const courseAudience = data.courseAudience;
      if (!isCourseAudience(courseAudience)) {
        return ctx.badRequest('Invalid course audience');
      }

      const courseName = data.courseName;
      if (!isCourseName(courseName)) {
        return ctx.badRequest('Invalid course name');
      }

      const expectedCourseName = courseNameByAudience[courseAudience];
      const isCourseSelectionMismatch = courseName !== expectedCourseName;
      if (isCourseSelectionMismatch) {
        return ctx.badRequest('Course name does not match selected course audience');
      }

      if (!data.personalDataConsent) {
        return ctx.badRequest('Personal data consent is required');
      }

      const isChildrenCourse = courseAudience === 'children';
      if (isChildrenCourse) {
        const missingChildrenField = childrenRequiredFields.find((field) => data[field].length === 0);

        if (missingChildrenField) {
          return ctx.badRequest(`Missing required field: ${missingChildrenField}`);
        }
      } else if (data.city.length === 0) {
        return ctx.badRequest('Missing required field: city');
      }

      const registrationData: CourseRegistrationData = { ...data, courseAudience, courseName };
      const entry = await strapi.entityService.create('api::course-registration.course-registration', {
        data: {
          ...registrationData,
          courseAudience: courseAudienceLabelByValue[courseAudience],
          courseName,
          emailNotificationSent: false,
        },
      });
      let emailNotificationSent = false;

      try {
        await sendCourseRegistrationEmail(strapi, registrationData);
        emailNotificationSent = true;
        await strapi.entityService.update('api::course-registration.course-registration', entry.id, {
          data: { emailNotificationSent: true, emailNotificationError: null },
        });
      } catch (error: unknown) {
        const emailNotificationError = error instanceof Error ? error.message : 'Unknown email delivery error.';
        strapi.log.error('Failed to send course registration notification email.', error);
        await strapi.entityService.update('api::course-registration.course-registration', entry.id, {
          data: { emailNotificationSent: false, emailNotificationError },
        });
      }

      ctx.body = { data: { id: entry.id, emailNotificationSent } };
    },
  })
);
