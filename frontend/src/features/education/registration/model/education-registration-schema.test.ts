import { describe, expect, it } from 'vitest';

import {
  COURSE_AUDIENCE,
  createEducationRegistrationDefaults,
  educationRegistrationSchema,
  toIsoBirthDate,
} from './education-registration-schema';

const childrenValues = {
  ...createEducationRegistrationDefaults(COURSE_AUDIENCE.CHILDREN),
  studentFullName: 'Иванов Иван Иванович',
  studentBirthDate: '15.04.2010',
  studentPhone: '+7 900 123-45-67',
  studentSocialLink: 'https://t.me/student',
  studyPlace: 'МОБУ СОШ № 38, 10А',
  parentFullName: 'Иванова Анна Сергеевна',
  parentPhone: '+7 900 765-43-21',
  parentSocialLink: 'https://vk.com/parent',
  consent: true,
};

describe('educationRegistrationSchema', () => {
  it('принимает детскую заявку с данными места обучения и родителя', () => {
    expect(educationRegistrationSchema.safeParse(childrenValues).success).toBe(true);
    expect(toIsoBirthDate(childrenValues.studentBirthDate)).toBe('2010-04-15');
  });

  it('требует город только для взрослой программы', () => {
    const adultValues = {
      ...createEducationRegistrationDefaults(COURSE_AUDIENCE.ADULTS),
      studentFullName: 'Петров Пётр Петрович',
      studentBirthDate: '21.08.1998',
      studentPhone: '+7 900 111-22-33',
      studentSocialLink: 'https://t.me/adult',
      city: 'Таганрог',
      consent: true,
    };

    expect(educationRegistrationSchema.safeParse(adultValues).success).toBe(true);
    const withoutCity = educationRegistrationSchema.safeParse({ ...adultValues, city: '' });
    expect(withoutCity.success).toBe(false);
  });

  it('отклоняет невозможную дату рождения и неполную детскую заявку', () => {
    const result = educationRegistrationSchema.safeParse({
      ...childrenValues,
      studentBirthDate: '31.02.2010',
      parentPhone: '',
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      const errors = result.error.flatten().fieldErrors;
      expect(errors.studentBirthDate).toBeDefined();
      expect(errors.parentPhone).toBeDefined();
    }
  });
});
