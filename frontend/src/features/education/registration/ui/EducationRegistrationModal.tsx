import { zodResolver } from '@hookform/resolvers/zod';
import type { ChangeEvent, KeyboardEvent, MouseEvent, ReactElement } from 'react';
import { useId, useRef, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { useEducationRegistrationMutation } from '@/features/education/registration/api/submit-education-registration';
import {
  COURSE_AUDIENCE,
  type CourseAudience,
  createEducationRegistrationDefaults,
  type EducationRegistrationValues,
  educationRegistrationSchema,
} from '@/features/education/registration/model/education-registration-schema';
import {
  formatBirthDateInput,
  formatHttpsUrlInput,
  formatRussianPhoneInput,
} from '@/features/education/registration/model/registration-input-masks';
import { FormCheckboxField, FormTextareaField, FormTextField } from '@/shared/ui/form/FormControls';
import { PersonalDataConsentLink } from '@/shared/ui/link/PersonalDataConsentLink';

import './education-registration-modal.scss';

const SUCCESS_MESSAGE =
  'Спасибо за вашу заинтересованность в обучении! Наш сотрудник свяжется с вами в течение рабочего дня, чтобы ответить на все вопросы';

type SubmissionStatus = 'idle' | 'success' | 'error';

interface EducationRegistrationModalProps {
  apiUrl?: string;
  audience: CourseAudience;
  courseTitle: string;
  triggerLabel: string;
}

function openDialog(dialog: HTMLDialogElement | null): void {
  if (dialog === null || dialog.open) return;
  if (typeof dialog.showModal === 'function') dialog.showModal();
  else dialog.setAttribute('open', '');
}

function closeDialog(dialog: HTMLDialogElement | null): void {
  if (dialog === null || !dialog.open) return;
  if (typeof dialog.close === 'function') dialog.close();
  else dialog.removeAttribute('open');
}

export function EducationRegistrationModal({
  apiUrl,
  audience,
  courseTitle,
  triggerLabel,
}: EducationRegistrationModalProps): ReactElement {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const dialogId = useId();
  const titleId = useId();
  const [status, setStatus] = useState<SubmissionStatus>('idle');
  const defaultValues = createEducationRegistrationDefaults(audience);
  const form = useForm<EducationRegistrationValues>({
    resolver: zodResolver(educationRegistrationSchema),
    defaultValues,
    mode: 'onSubmit',
    reValidateMode: 'onBlur',
  });
  const mutation = useEducationRegistrationMutation(apiUrl);
  const {
    register,
    formState: { errors, isSubmitting },
  } = form;
  const isChildrenCourse = audience === COURSE_AUDIENCE.CHILDREN;
  const isPending = isSubmitting || mutation.isPending;
  type MaskedFieldName = 'studentBirthDate' | 'studentPhone' | 'studentSocialLink' | 'parentPhone' | 'parentSocialLink';

  const registerMaskedField = (fieldName: MaskedFieldName, formatter: (value: string) => string) =>
    register(fieldName, {
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        const formattedValue = formatter(event.target.value);
        event.target.value = formattedValue;
        form.setValue(fieldName, formattedValue, { shouldDirty: true });
      },
    });

  const handleOpen = (): void => {
    setStatus('idle');
    form.reset(defaultValues);
    openDialog(dialogRef.current);
  };

  const handleClose = (): void => closeDialog(dialogRef.current);

  const handleBackdropClick = (event: MouseEvent<HTMLDialogElement>): void => {
    if (event.target === event.currentTarget) closeDialog(dialogRef.current);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDialogElement>): void => {
    if (event.key === 'Escape') {
      event.preventDefault();
      closeDialog(dialogRef.current);
    }
  };

  const onSubmit = async (values: EducationRegistrationValues): Promise<void> => {
    setStatus('idle');
    try {
      await mutation.mutateAsync(values);
      form.reset(defaultValues);
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  return (
    <>
      <button
        className="education__cta"
        type="button"
        aria-haspopup="dialog"
        aria-controls={dialogId}
        onClick={handleOpen}
      >
        {triggerLabel}
      </button>
      <dialog
        className="education-registration-modal"
        id={dialogId}
        ref={dialogRef}
        aria-labelledby={titleId}
        onClick={handleBackdropClick}
        onKeyDown={handleKeyDown}
      >
        <div className="education-registration-modal__surface">
          <header className="education-registration-modal__header">
            <div>
              <span>Регистрация на обучение</span>
              <h3 id={titleId}>{courseTitle}</h3>
            </div>
            <button type="button" onClick={handleClose} aria-label="Закрыть форму регистрации">
              Закрыть
            </button>
          </header>

          {status === 'success' ? (
            <div className="education-registration-modal__success" role="status">
              <strong>Заявка отправлена</strong>
              <p>{SUCCESS_MESSAGE}</p>
              <button type="button" onClick={handleClose}>
                Готово
              </button>
            </div>
          ) : (
            <FormProvider {...form}>
              <form className="education-registration-modal__form" onSubmit={form.handleSubmit(onSubmit)} noValidate>
                <input type="hidden" {...register('courseAudience')} />
                <input type="hidden" {...register('courseName')} />
                <div className="education-registration-modal__grid">
                  <FormTextField
                    id={`${dialogId}-student-name`}
                    label="ФИО обучающегося"
                    autoComplete="name"
                    error={errors.studentFullName?.message}
                    registration={register('studentFullName')}
                  />
                  <FormTextField
                    id={`${dialogId}-birth-date`}
                    label="Дата рождения обучающегося"
                    placeholder="дд.мм.гггг"
                    inputMode="numeric"
                    maxLength={10}
                    autoComplete="bday"
                    error={errors.studentBirthDate?.message}
                    registration={registerMaskedField('studentBirthDate', formatBirthDateInput)}
                  />
                  <FormTextField
                    id={`${dialogId}-student-phone`}
                    label="Номер телефона обучающегося"
                    type="tel"
                    inputMode="tel"
                    maxLength={18}
                    autoComplete="tel"
                    error={errors.studentPhone?.message}
                    registration={registerMaskedField('studentPhone', formatRussianPhoneInput)}
                  />
                  <FormTextField
                    id={`${dialogId}-student-social`}
                    label="Ссылка на Telegram/ВК обучающегося"
                    type="url"
                    inputMode="url"
                    placeholder="https://t.me/username"
                    maxLength={300}
                    error={errors.studentSocialLink?.message}
                    registration={registerMaskedField('studentSocialLink', formatHttpsUrlInput)}
                  />

                  {isChildrenCourse ? (
                    <>
                      <FormTextareaField
                        containerClassName="education-registration-modal__wide-field"
                        id={`${dialogId}-study-place`}
                        label="Место обучения обучающегося"
                        rows={4}
                        hint={
                          <>
                            Необходимо написать:
                            <ul>
                              <li>название и номер школы/колледжа;</li>
                              <li>номер класса/курс обучения;</li>
                              <li>букву класса/номер группы.</li>
                            </ul>
                            Например: «МОБУ СОШ № 38, 10А» или «Механический колледж, 4 курс, группа 14ОИБАС».
                          </>
                        }
                        error={errors.studyPlace?.message}
                        registration={register('studyPlace')}
                      />
                      <FormTextField
                        id={`${dialogId}-parent-name`}
                        label="ФИО родителя/законного представителя"
                        autoComplete="name"
                        error={errors.parentFullName?.message}
                        registration={register('parentFullName')}
                      />
                      <FormTextField
                        id={`${dialogId}-parent-phone`}
                        label="Номер телефона родителя/законного представителя"
                        type="tel"
                        inputMode="tel"
                        maxLength={18}
                        autoComplete="tel"
                        error={errors.parentPhone?.message}
                        registration={registerMaskedField('parentPhone', formatRussianPhoneInput)}
                      />
                      <FormTextField
                        containerClassName="education-registration-modal__wide-field"
                        id={`${dialogId}-parent-social`}
                        label="Ссылка на Telegram/ВК родителя/законного представителя"
                        type="url"
                        inputMode="url"
                        placeholder="https://vk.com/username"
                        maxLength={300}
                        error={errors.parentSocialLink?.message}
                        registration={registerMaskedField('parentSocialLink', formatHttpsUrlInput)}
                      />
                    </>
                  ) : (
                    <FormTextField
                      containerClassName="education-registration-modal__wide-field"
                      id={`${dialogId}-city`}
                      label="Город проживания"
                      autoComplete="address-level2"
                      error={errors.city?.message}
                      registration={register('city')}
                    />
                  )}
                </div>

                <FormCheckboxField
                  id={`${dialogId}-consent`}
                  label={
                    <span>
                      Я согласен на <PersonalDataConsentLink /> для регистрации на обучение.
                    </span>
                  }
                  error={errors.consent?.message}
                  registration={register('consent')}
                />

                <div className="education-registration-modal__actions">
                  <button type="submit" disabled={isPending}>
                    {isPending ? 'Отправляем…' : 'Отправить заявку'}
                  </button>
                  <div aria-live="polite">
                    {status === 'error' && 'Не удалось отправить заявку. Попробуйте ещё раз или напишите нам на почту.'}
                  </div>
                </div>
              </form>
            </FormProvider>
          )}
        </div>
      </dialog>
    </>
  );
}
