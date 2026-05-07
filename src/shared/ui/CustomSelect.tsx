import { useEffect, useRef, useState } from 'react';
import type { ReactElement } from 'react';

export interface SelectOption<TValue extends string> {
  value: TValue;
  label: string;
}

interface CustomSelectProps<TValue extends string> {
  name: string;
  value: TValue;
  options: readonly SelectOption<TValue>[];
  onChange: (value: TValue) => void;
  ariaLabel: string;
}

export function CustomSelect<TValue extends string>({
  name,
  value,
  options,
  onChange,
  ariaLabel,
}: CustomSelectProps<TValue>): ReactElement {
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const selectedOption = options.find((option) => option.value === value) ?? options[0];

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const closeOnOutsideClick = (event: MouseEvent): void => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', closeOnOutsideClick);

    return () => {
      document.removeEventListener('mousedown', closeOnOutsideClick);
    };
  }, [isOpen]);

  return (
    <div className="custom-select" ref={rootRef}>
      <input name={name} type="hidden" value={value} />
      <button
        aria-expanded={isOpen}
        aria-label={ariaLabel}
        className="custom-select-trigger"
        onClick={() => setIsOpen((currentValue) => !currentValue)}
        type="button"
      >
        <span>{selectedOption.label}</span>
        <span className="custom-select-arrow">⌄</span>
      </button>
      {isOpen && (
        <div className="custom-select-options" role="listbox">
          {options.map((option) => (
            <button
              aria-selected={option.value === value}
              className="custom-select-option"
              key={option.value}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
              role="option"
              type="button"
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
