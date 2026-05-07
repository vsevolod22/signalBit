import { useState } from 'react';
import type { ChangeEvent, FormEvent, ReactElement } from 'react';
import { ru } from 'date-fns/locale/ru';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { useCourseRegistrationMutation } from '@/shared/api/form-mutations';
import type { CourseAudience, CourseRegistrationPayload } from '@/shared/api/strapi-forms';
import { CustomSelect } from '@/shared/ui/CustomSelect';
import { courseRegistrationSchema, getFieldErrors } from '@/shared/validation/form-schemas';
import type { FieldErrors } from '@/shared/validation/form-schemas';

const initialForm: CourseRegistrationPayload = {
  courseAudience: 'children',
  courseName: 'Школа пилотирования',
  studentFullName: '',
  studentBirthDate: '',
  studentPhone: '',
  studentSocialLink: '',
  city: '',
  parentFullName: '',
  parentPhone: '',
  parentSocialLink: '',
  personalDataConsent: false,
};

type FormField = keyof CourseRegistrationPayload;
type CourseName = CourseRegistrationPayload['courseName'];

const audienceOptions = [
  { value: 'children', label: 'Детские курсы' },
  { value: 'adults', label: 'Взрослые курсы' },
] as const;

const courseOptionsByAudience = {
  children: [{ value: 'Школа пилотирования', label: 'Школа пилотирования' }],
  adults: [{ value: 'Инженер-оператор БАС 18+', label: 'Инженер-оператор БАС 18+' }],
} as const satisfies Record<CourseAudience, readonly { value: CourseName; label: string }[]>;

const monthOptions = [
  'Январь',
  'Февраль',
  'Март',
  'Апрель',
  'Май',
  'Июнь',
  'Июль',
  'Август',
  'Сентябрь',
  'Октябрь',
  'Ноябрь',
  'Декабрь',
] as const;

const currentYear = new Date().getFullYear();
const yearOptions = Array.from({ length: 100 }, (_, index) => currentYear - index);

function dateStringToDate(value: string): Date | null {
  if (value.length === 0) {
    return null;
  }

  return new Date(`${value}T00:00:00`);
}

function dateToDateString(value: Date | null): string {
  if (value === null) {
    return '';
  }

  const year = value.getFullYear();
  const month = String(value.getMonth() + 1).padStart(2, '0');
  const day = String(value.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

interface CourseRegistrationFormProps {
  educationEyebrow?: string;
  educationTitle?: string;
  parentFieldsTitle?: string;
}

export function CourseRegistrationForm({
  educationEyebrow = 'Образование',
  educationTitle = 'Регистрация на образовательные курсы',
  parentFieldsTitle = 'Данные родителя для детского курса',
}: CourseRegistrationFormProps): ReactElement {
  const [form, setForm] = useState<CourseRegistrationPayload>(initialForm);
  const [errors, setErrors] = useState<FieldErrors<FormField>>({});
  const courseRegistrationMutation = useCourseRegistrationMutation();
  const isChildrenCourse = form.courseAudience === 'children';
  const courseOptions = courseOptionsByAudience[form.courseAudience];

  const updateField = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    const { name, value } = event.target;
    const fieldName = name as FormField;

    setForm((currentForm) => ({
      ...currentForm,
      [fieldName]: value,
    }));
    setErrors((currentErrors) => ({
      ...currentErrors,
      [fieldName]: undefined,
    }));
  };

  const updateSelectField = <TField extends 'courseAudience' | 'courseName'>(
    fieldName: TField,
    value: CourseRegistrationPayload[TField],
  ): void => {
    setForm((currentForm) => ({
      ...currentForm,
      [fieldName]: value,
    }));
    setErrors((currentErrors) => ({
      ...currentErrors,
      [fieldName]: undefined,
    }));
  };

  const updateAudience = (courseAudience: CourseAudience): void => {
    setForm((currentForm) => ({
      ...currentForm,
      courseAudience,
      courseName: courseOptionsByAudience[courseAudience][0].value,
      parentFullName: courseAudience === 'children' ? currentForm.parentFullName : '',
      parentPhone: courseAudience === 'children' ? currentForm.parentPhone : '',
      parentSocialLink: courseAudience === 'children' ? currentForm.parentSocialLink : '',
    }));
    setErrors((currentErrors) => ({
      ...currentErrors,
      courseAudience: undefined,
      courseName: undefined,
      parentFullName: undefined,
      parentPhone: undefined,
      parentSocialLink: undefined,
    }));
  };

  const updateBirthDate = (value: Date | null): void => {
    setForm((currentForm) => ({
      ...currentForm,
      studentBirthDate: dateToDateString(value),
    }));
    setErrors((currentErrors) => ({
      ...currentErrors,
      studentBirthDate: undefined,
    }));
  };

  const updateConsent = (event: ChangeEvent<HTMLInputElement>): void => {
    setForm((currentForm) => ({
      ...currentForm,
      personalDataConsent: event.target.checked,
    }));
    setErrors((currentErrors) => ({
      ...currentErrors,
      personalDataConsent: undefined,
    }));
  };

  const submitForm = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    const validationResult = courseRegistrationSchema.safeParse(form);

    if (!validationResult.success) {
      setErrors(getFieldErrors<FormField>(validationResult.error));
      return;
    }

    setErrors({});

    try {
      await courseRegistrationMutation.mutateAsync(validationResult.data);
      setForm(initialForm);
    } catch {}
  };

  return (
    <form className="course-registration-form" noValidate onSubmit={submitForm}>
      <div className="education-form-intro">
        <span>{educationEyebrow}</span>
        <h3>{educationTitle}</h3>
      </div>
      <div className="course-selector">
        <label className="form-field">
          <span>Категория курса</span>
          <CustomSelect<CourseAudience>
            ariaLabel="Категория курса"
            name="courseAudience"
            onChange={updateAudience}
            options={audienceOptions}
            value={form.courseAudience}
          />
          {errors.courseAudience !== undefined && (
            <small className="field-error">{errors.courseAudience}</small>
          )}
        </label>
        <label className="form-field">
          <span>Курс</span>
          <CustomSelect<CourseName>
            ariaLabel="Курс"
            name="courseName"
            onChange={(value) => updateSelectField('courseName', value)}
            options={courseOptions}
            value={form.courseName}
          />
          {errors.courseName !== undefined && <small className="field-error">{errors.courseName}</small>}
        </label>
      </div>
      <div className="course-grid">
        <label className="form-field">
          <span>ФИО ученика</span>
          <input name="studentFullName" value={form.studentFullName} onChange={updateField} />
          {errors.studentFullName !== undefined && (
            <small className="field-error">{errors.studentFullName}</small>
          )}
        </label>
        <label className="form-field">
          <span>Дата рождения ученика</span>
          <DatePicker
            className="date-picker-input"
            dateFormat="dd.MM.yyyy"
            calendarStartDay={1}
            formatWeekDay={(dayName) => dayName.slice(0, 2)}
            locale={ru}
            maxDate={new Date()}
            onChange={updateBirthDate}
            placeholderText="дд.мм.гггг"
            renderCustomHeader={({
              date,
              changeMonth,
              changeYear,
              decreaseMonth,
              increaseMonth,
              prevMonthButtonDisabled,
              nextMonthButtonDisabled,
            }) => (
              <div className="datepicker-header">
                <button
                  aria-label="Предыдущий месяц"
                  className="datepicker-nav-button"
                  disabled={prevMonthButtonDisabled}
                  onClick={decreaseMonth}
                  type="button"
                >
                  ‹
                </button>
                <div className="datepicker-controls">
                  <select
                    aria-label="Месяц"
                    onChange={(event) => changeMonth(Number(event.target.value))}
                    value={date.getMonth()}
                  >
                    {monthOptions.map((month, index) => (
                      <option key={month} value={index}>
                        {month}
                      </option>
                    ))}
                  </select>
                  <select
                    aria-label="Год"
                    onChange={(event) => changeYear(Number(event.target.value))}
                    value={date.getFullYear()}
                  >
                    {yearOptions.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                </div>
                <button
                  aria-label="Следующий месяц"
                  className="datepicker-nav-button"
                  disabled={nextMonthButtonDisabled}
                  onClick={increaseMonth}
                  type="button"
                >
                  ›
                </button>
              </div>
            )}
            selected={dateStringToDate(form.studentBirthDate)}
          />
          {errors.studentBirthDate !== undefined && (
            <small className="field-error">{errors.studentBirthDate}</small>
          )}
        </label>
      </div>
      <div className="course-grid">
        <label className="form-field">
          <span>Номер телефона ученика</span>
          <input name="studentPhone" value={form.studentPhone} onChange={updateField} />
          {errors.studentPhone !== undefined && (
            <small className="field-error">{errors.studentPhone}</small>
          )}
        </label>
        <label className="form-field">
          <span>Ссылка на Telegram/VK ученика</span>
          <input name="studentSocialLink" value={form.studentSocialLink} onChange={updateField} />
          {errors.studentSocialLink !== undefined && (
            <small className="field-error">{errors.studentSocialLink}</small>
          )}
        </label>
      </div>
      <label className="form-field">
        <span>Город проживания</span>
        <input name="city" value={form.city} onChange={updateField} />
        {errors.city !== undefined && <small className="field-error">{errors.city}</small>}
      </label>
      {isChildrenCourse && (
        <div className="parent-fields">
          <p>{parentFieldsTitle}</p>
          <div className="course-grid">
            <label className="form-field">
              <span>ФИО родителя ученика</span>
              <input name="parentFullName" value={form.parentFullName} onChange={updateField} />
              {errors.parentFullName !== undefined && (
                <small className="field-error">{errors.parentFullName}</small>
              )}
            </label>
            <label className="form-field">
              <span>Номер телефона родителя ученика</span>
              <input name="parentPhone" value={form.parentPhone} onChange={updateField} />
              {errors.parentPhone !== undefined && (
                <small className="field-error">{errors.parentPhone}</small>
              )}
            </label>
          </div>
          <label className="form-field">
            <span>Ссылка на Telegram/VK родителя ученика</span>
            <input name="parentSocialLink" value={form.parentSocialLink} onChange={updateField} />
            {errors.parentSocialLink !== undefined && (
              <small className="field-error">{errors.parentSocialLink}</small>
            )}
          </label>
        </div>
      )}
      <label className="consent-field">
        <input
          name="personalDataConsent"
          checked={form.personalDataConsent}
          onChange={updateConsent}
          type="checkbox"
        />
        Согласие на обработку персональных данных
        {errors.personalDataConsent !== undefined && (
          <small className="field-error">{errors.personalDataConsent}</small>
        )}
      </label>
      <button type="submit" disabled={courseRegistrationMutation.isPending}>
        {courseRegistrationMutation.isPending ? 'Отправляем...' : 'Отправить'}
      </button>
      {courseRegistrationMutation.isSuccess && (
        <p className="form-status success">Заявка на курс отправлена.</p>
      )}
      {courseRegistrationMutation.isError && (
        <p className="form-status error">Не удалось отправить заявку.</p>
      )}
    </form>
  );
}
