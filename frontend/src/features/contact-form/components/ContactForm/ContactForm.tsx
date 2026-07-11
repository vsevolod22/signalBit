import { useState } from 'react';
import type { ReactElement } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';

import { submitContactForm } from '@/features/contact-form/api/submit-contact-form';
import { contactFormSchema } from '@/features/contact-form/model/contact-form-schema';
import type { ContactFormValues } from '@/features/contact-form/model/contact-form-schema';
import { fadeUpVariants, pageSectionVariants, revealViewport } from '@/shared/lib/landing-motion';

import './contact-form.scss';

type SubmissionStatus = 'idle' | 'success' | 'demo' | 'error';

const DEFAULT_VALUES: ContactFormValues = {
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
  consent: false,
};

interface FieldErrorProps {
  id: string;
  message?: string;
}

function FieldError({ id, message }: FieldErrorProps): ReactElement | null {
  return message === undefined ? null : (
    <span className="form-error" id={id} role="alert">
      {message}
    </span>
  );
}

export function ContactForm(): ReactElement {
  const [status, setStatus] = useState<SubmissionStatus>('idle');
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: DEFAULT_VALUES,
    mode: 'onSubmit',
    reValidateMode: 'onBlur',
  });

  const onSubmit = async (values: ContactFormValues): Promise<void> => {
    setStatus('idle');

    try {
      const result = await submitContactForm(values);
      setStatus(result.delivered ? 'success' : 'demo');

      if (result.delivered) {
        reset(DEFAULT_VALUES);
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <motion.div
      className="contact-form-section"
      id="request"
      aria-labelledby="request-title"
      initial="hidden"
      whileInView="visible"
      viewport={revealViewport}
      variants={pageSectionVariants}
    >
      <motion.div className="contact-form-intro" variants={fadeUpVariants}>
        <span className="section-kicker">Связаться с командой</span>
        <h3 id="request-title">Оставьте заявку</h3>
        <p>Опишите задачу в нескольких предложениях. Мы изучим детали и предложим следующий шаг.</p>
      </motion.div>

      <motion.form className="contact-form" onSubmit={handleSubmit(onSubmit)} noValidate variants={fadeUpVariants}>
        <div className="form-row">
          <div className="form-field">
            <label htmlFor="contact-name">Имя</label>
            <input
              id="contact-name"
              type="text"
              autoComplete="name"
              aria-invalid={errors.name !== undefined}
              aria-describedby={errors.name === undefined ? undefined : 'contact-name-error'}
              {...register('name')}
            />
            <FieldError id="contact-name-error" message={errors.name?.message} />
          </div>
          <div className="form-field">
            <label htmlFor="contact-email">Email</label>
            <input
              id="contact-email"
              type="email"
              autoComplete="email"
              inputMode="email"
              aria-invalid={errors.email !== undefined}
              aria-describedby={errors.email === undefined ? undefined : 'contact-email-error'}
              {...register('email')}
            />
            <FieldError id="contact-email-error" message={errors.email?.message} />
          </div>
        </div>

        <div className="form-row">
          <div className="form-field">
            <label htmlFor="contact-phone">Телефон <span>(необязательно)</span></label>
            <input
              id="contact-phone"
              type="tel"
              autoComplete="tel"
              inputMode="tel"
              aria-invalid={errors.phone !== undefined}
              aria-describedby={errors.phone === undefined ? undefined : 'contact-phone-error'}
              {...register('phone')}
            />
            <FieldError id="contact-phone-error" message={errors.phone?.message} />
          </div>
          <div className="form-field">
            <label htmlFor="contact-subject">Тема обращения</label>
            <input
              id="contact-subject"
              type="text"
              autoComplete="off"
              aria-invalid={errors.subject !== undefined}
              aria-describedby={errors.subject === undefined ? undefined : 'contact-subject-error'}
              {...register('subject')}
            />
            <FieldError id="contact-subject-error" message={errors.subject?.message} />
          </div>
        </div>

        <div className="form-field">
          <label htmlFor="contact-message">Сообщение</label>
          <textarea
            id="contact-message"
            rows={6}
            aria-invalid={errors.message !== undefined}
            aria-describedby={errors.message === undefined ? undefined : 'contact-message-error'}
            {...register('message')}
          />
          <FieldError id="contact-message-error" message={errors.message?.message} />
        </div>

        <div className="form-consent">
          <input
            id="contact-consent"
            type="checkbox"
            aria-invalid={errors.consent !== undefined}
            aria-describedby={errors.consent === undefined ? undefined : 'contact-consent-error'}
            {...register('consent')}
          />
          <label htmlFor="contact-consent">Я согласен на обработку данных для ответа на обращение.</label>
          <FieldError id="contact-consent-error" message={errors.consent?.message} />
        </div>

        <div className="form-actions">
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Отправляем…' : 'Отправить заявку'}
          </button>
          <div className="form-status" aria-live="polite" aria-atomic="true">
            {status === 'success' && 'Спасибо! Заявка отправлена. Мы свяжемся с вами в следующий рабочий день.'}
            {status === 'demo' && (
              <span>
                Форма заполнена корректно. Онлайн-отправка пока не подключена — отправьте обращение на{' '}
                <a href="mailto:sigbit@yandex.ru">sigbit@yandex.ru</a>.
              </span>
            )}
            {status === 'error' && 'Не удалось отправить заявку. Попробуйте снова или напишите нам по email.'}
          </div>
        </div>
      </motion.form>
    </motion.div>
  );
}
