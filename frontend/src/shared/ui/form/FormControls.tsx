import type { InputHTMLAttributes, ReactElement, ReactNode, TextareaHTMLAttributes } from 'react';
import type { UseFormRegisterReturn } from 'react-hook-form';

import './form-controls.scss';

interface FormFieldShellProps {
  children: ReactNode;
  className?: string;
  error?: string;
  hint?: ReactNode;
  id: string;
  label: ReactNode;
}

function getDescriptionIds(id: string, hasHint: boolean, hasError: boolean): string | undefined {
  const ids = [hasHint ? `${id}-hint` : undefined, hasError ? `${id}-error` : undefined].filter(Boolean);
  return ids.length > 0 ? ids.join(' ') : undefined;
}

function FormFieldShell({ children, className, error, hint, id, label }: FormFieldShellProps): ReactElement {
  return (
    <div className={`form-field${className === undefined ? '' : ` ${className}`}`}>
      <label htmlFor={id}>{label}</label>
      {hint !== undefined && (
        <div className="form-field__hint" id={`${id}-hint`}>
          {hint}
        </div>
      )}
      {children}
      {error !== undefined && (
        <span className="form-field__error" id={`${id}-error`} role="alert">
          {error}
        </span>
      )}
    </div>
  );
}

interface FormTextFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'id'> {
  containerClassName?: string;
  error?: string;
  hint?: ReactNode;
  id: string;
  label: ReactNode;
  registration: UseFormRegisterReturn;
}

export function FormTextField({
  containerClassName,
  error,
  hint,
  id,
  label,
  registration,
  ...inputProps
}: FormTextFieldProps): ReactElement {
  return (
    <FormFieldShell className={containerClassName} error={error} hint={hint} id={id} label={label}>
      <input
        {...registration}
        {...inputProps}
        id={id}
        aria-invalid={error !== undefined}
        aria-describedby={getDescriptionIds(id, hint !== undefined, error !== undefined)}
      />
    </FormFieldShell>
  );
}

interface FormTextareaFieldProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'id'> {
  containerClassName?: string;
  error?: string;
  hint?: ReactNode;
  id: string;
  label: ReactNode;
  registration: UseFormRegisterReturn;
}

export function FormTextareaField({
  containerClassName,
  error,
  hint,
  id,
  label,
  registration,
  ...textareaProps
}: FormTextareaFieldProps): ReactElement {
  return (
    <FormFieldShell className={containerClassName} error={error} hint={hint} id={id} label={label}>
      <textarea
        {...registration}
        {...textareaProps}
        id={id}
        aria-invalid={error !== undefined}
        aria-describedby={getDescriptionIds(id, hint !== undefined, error !== undefined)}
      />
    </FormFieldShell>
  );
}

interface FormCheckboxFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'id' | 'type'> {
  error?: string;
  id: string;
  label: ReactNode;
  registration: UseFormRegisterReturn;
}

export function FormCheckboxField({
  error,
  id,
  label,
  registration,
  ...inputProps
}: FormCheckboxFieldProps): ReactElement {
  return (
    <div className="form-checkbox">
      <input
        {...registration}
        {...inputProps}
        id={id}
        type="checkbox"
        aria-invalid={error !== undefined}
        aria-describedby={error === undefined ? undefined : `${id}-error`}
      />
      <label htmlFor={id}>{label}</label>
      {error !== undefined && (
        <span className="form-field__error" id={`${id}-error`} role="alert">
          {error}
        </span>
      )}
    </div>
  );
}
