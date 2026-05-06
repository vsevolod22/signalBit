import { useState } from 'react';
import type { ChangeEvent, FormEvent, ReactElement } from 'react';

import { submitContactRequest } from '@/shared/api/strapi-forms';

const initialForm = {
  fullName: '',
  email: '',
  contactMethod: '',
  question: '',
};

type FormState = typeof initialForm;

export function ContactRequestForm(): ReactElement {
  const [form, setForm] = useState<FormState>(initialForm);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const updateField = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = event.target;

    setForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));
  };

  const submitForm = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    setStatus('submitting');

    try {
      await submitContactRequest(form);
      setForm(initialForm);
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  return (
    <form className="request-form contact-request-form" onSubmit={submitForm}>
      <h3>Задать вопрос</h3>
      <label>
        Как к вам обращаться
        <input
          name="fullName"
          value={form.fullName}
          onChange={updateField}
          required
          placeholder="ФИО"
        />
      </label>
      <label>
        Почта
        <input
          name="email"
          value={form.email}
          onChange={updateField}
          type="email"
          placeholder="example@mail.ru"
        />
      </label>
      <label>
        Как с вами связаться
        <input
          name="contactMethod"
          value={form.contactMethod}
          onChange={updateField}
          required
          placeholder="Телефон, Telegram, VK или другой способ связи"
        />
      </label>
      <label>
        Какой у вас вопрос
        <textarea
          name="question"
          value={form.question}
          onChange={updateField}
          required
          rows={4}
          placeholder="Опишите ваш вопрос"
        />
      </label>
      <button type="submit" disabled={status === 'submitting'}>
        {status === 'submitting' ? 'Отправляем...' : 'Отправить'}
      </button>
      {status === 'success' && <p className="form-status success">Заявка отправлена.</p>}
      {status === 'error' && <p className="form-status error">Не удалось отправить заявку.</p>}
    </form>
  );
}
