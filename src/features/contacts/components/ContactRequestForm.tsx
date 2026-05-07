import { useState } from 'react';
import type { ChangeEvent, FormEvent, ReactElement } from 'react';

import { useContactRequestMutation } from '@/shared/api/form-mutations';
import { contactRequestSchema, getFieldErrors } from '@/shared/validation/form-schemas';
import type { FieldErrors } from '@/shared/validation/form-schemas';

const initialForm = {
  fullName: '',
  email: '',
  contactMethod: '',
  question: '',
};

type FormState = typeof initialForm;
type FormField = keyof FormState;

export function ContactRequestForm(): ReactElement {
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<FieldErrors<FormField>>({});
  const contactRequestMutation = useContactRequestMutation();

  const updateField = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
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

  const submitForm = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    const validationResult = contactRequestSchema.safeParse(form);

    if (!validationResult.success) {
      setErrors(getFieldErrors<FormField>(validationResult.error));
      return;
    }

    setErrors({});

    try {
      await contactRequestMutation.mutateAsync(validationResult.data);
      setForm(initialForm);
    } catch {}
  };

  return (
    <form className="contact-request-form" noValidate onSubmit={submitForm}>
      <div className="form-heading">
        <span>Форма связи</span>
        <h3>Задать вопрос</h3>
      </div>
      <label className="form-field">
        <span>Как к вам обращаться</span>
        <input
          name="fullName"
          value={form.fullName}
          onChange={updateField}
          placeholder="ФИО"
        />
        {errors.fullName !== undefined && <small className="field-error">{errors.fullName}</small>}
      </label>
      <label className="form-field">
        <span>Почта</span>
        <input
          name="email"
          value={form.email}
          onChange={updateField}
          inputMode="email"
          placeholder="example@mail.ru"
        />
        {errors.email !== undefined && <small className="field-error">{errors.email}</small>}
      </label>
      <label className="form-field">
        <span>Как с вами связаться</span>
        <input
          name="contactMethod"
          value={form.contactMethod}
          onChange={updateField}
          placeholder="Телефон, Telegram, VK или другой способ связи"
        />
        {errors.contactMethod !== undefined && (
          <small className="field-error">{errors.contactMethod}</small>
        )}
      </label>
      <label className="form-field wide-field">
        <span>Какой у вас вопрос</span>
        <textarea
          name="question"
          value={form.question}
          onChange={updateField}
          rows={4}
          placeholder="Опишите ваш вопрос"
        />
        {errors.question !== undefined && <small className="field-error">{errors.question}</small>}
      </label>
      <button type="submit" disabled={contactRequestMutation.isPending}>
        {contactRequestMutation.isPending ? 'Отправляем...' : 'Отправить'}
      </button>
      {contactRequestMutation.isSuccess && <p className="form-status success">Заявка отправлена.</p>}
      {contactRequestMutation.isError && <p className="form-status error">Не удалось отправить заявку.</p>}
    </form>
  );
}
