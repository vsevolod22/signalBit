import { useState } from 'react';
import type { ChangeEvent, FormEvent, ReactElement } from 'react';

import type { CourseAudience, CourseRegistrationPayload } from '@/shared/api/strapi-forms';
import { submitCourseRegistration } from '@/shared/api/strapi-forms';

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

export function CourseRegistrationForm(): ReactElement {
  const [form, setForm] = useState<CourseRegistrationPayload>(initialForm);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const isChildrenCourse = form.courseAudience === 'children';

  const updateField = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    const { name, value } = event.target;

    setForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));
  };

  const updateAudience = (event: ChangeEvent<HTMLSelectElement>): void => {
    const courseAudience = event.target.value as CourseAudience;

    setForm((currentForm) => ({
      ...currentForm,
      courseAudience,
    }));
  };

  const updateConsent = (event: ChangeEvent<HTMLInputElement>): void => {
    setForm((currentForm) => ({
      ...currentForm,
      personalDataConsent: event.target.checked,
    }));
  };

  const submitForm = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    setStatus('submitting');

    try {
      await submitCourseRegistration(form);
      setForm(initialForm);
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  return (
    <form className="request-form course-registration-form" onSubmit={submitForm}>
      <h3>Регистрация на образовательные курсы</h3>
      <div className="course-grid">
        <label>
          Категория курса
          <select name="courseAudience" value={form.courseAudience} onChange={updateAudience}>
            <option value="children">Детские курсы</option>
            <option value="adults">Взрослые курсы</option>
          </select>
        </label>
        <label>
          Курс
          <select name="courseName" value={form.courseName} onChange={updateField}>
            <option value="Школа пилотирования">Школа пилотирования</option>
            <option value="Инженер-оператор БАС 18+">Инженер-оператор БАС 18+</option>
          </select>
        </label>
      </div>
      <div className="course-grid">
        <label>
          ФИО ученика
          <input name="studentFullName" value={form.studentFullName} onChange={updateField} required />
        </label>
        <label>
          Дата рождения ученика
          <input
            name="studentBirthDate"
            value={form.studentBirthDate}
            onChange={updateField}
            required
            type="date"
          />
        </label>
      </div>
      <div className="course-grid">
        <label>
          Номер телефона ученика
          <input name="studentPhone" value={form.studentPhone} onChange={updateField} required />
        </label>
        <label>
          Ссылка на Telegram/VK ученика
          <input name="studentSocialLink" value={form.studentSocialLink} onChange={updateField} required />
        </label>
      </div>
      <label>
        Город проживания
        <input name="city" value={form.city} onChange={updateField} required />
      </label>
      {isChildrenCourse && (
        <div className="parent-fields">
          <div className="course-grid">
            <label>
              ФИО родителя ученика
              <input name="parentFullName" value={form.parentFullName} onChange={updateField} required />
            </label>
            <label>
              Номер телефона родителя ученика
              <input name="parentPhone" value={form.parentPhone} onChange={updateField} required />
            </label>
          </div>
          <label>
            Ссылка на Telegram/VK родителя ученика
            <input name="parentSocialLink" value={form.parentSocialLink} onChange={updateField} required />
          </label>
        </div>
      )}
      <label className="consent-field">
        <input
          name="personalDataConsent"
          checked={form.personalDataConsent}
          onChange={updateConsent}
          required
          type="checkbox"
        />
        Согласие на обработку персональных данных
      </label>
      <button type="submit" disabled={status === 'submitting'}>
        {status === 'submitting' ? 'Отправляем...' : 'Отправить'}
      </button>
      {status === 'success' && <p className="form-status success">Заявка на курс отправлена.</p>}
      {status === 'error' && <p className="form-status error">Не удалось отправить заявку.</p>}
    </form>
  );
}
