import type { ReactElement } from 'react';

export type SubmissionStatus = 'idle' | 'success' | 'error';

const SUBMISSION_STATUS_MESSAGE: Record<SubmissionStatus, string> = {
  idle: '',
  success: 'Спасибо! Заявка отправлена. Мы свяжемся с вами в следующий рабочий день.',
  error: 'Не удалось отправить заявку. Попробуйте снова или напишите нам по email.',
};

export function ContactFormStatus({ isPending, status }: { isPending: boolean; status: SubmissionStatus }): ReactElement {
  const submitButtonLabel = isPending ? 'Отправляем…' : 'Отправить заявку';

  return (
    <div className="form-actions">
      <button type="submit" disabled={isPending}>
        {submitButtonLabel}
      </button>
      <div className="form-status" aria-live="polite" aria-atomic="true">
        {SUBMISSION_STATUS_MESSAGE[status]}
      </div>
    </div>
  );
}
