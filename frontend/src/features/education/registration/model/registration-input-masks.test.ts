import { describe, expect, it } from 'vitest';

import { formatBirthDateInput, formatHttpsUrlInput, formatRussianPhoneInput } from './registration-input-masks';

describe('registration input masks', () => {
  it('добавляет точки в дату и ограничивает её восемью цифрами', () => {
    expect(formatBirthDateInput('1')).toBe('1');
    expect(formatBirthDateInput('1203')).toBe('12.03');
    expect(formatBirthDateInput('12.03.2000123')).toBe('12.03.2000');
  });

  it('форматирует российские номера с неизменяемым кодом +7', () => {
    expect(formatRussianPhoneInput('')).toBe('+7');
    expect(formatRussianPhoneInput('89001234567')).toBe('+7 900 123-45-67');
    expect(formatRussianPhoneInput('+7 (900) 123-45-67')).toBe('+7 900 123-45-67');
  });

  it('добавляет безопасный протокол к ссылкам', () => {
    expect(formatHttpsUrlInput('')).toBe('https://');
    expect(formatHttpsUrlInput('t.me/student')).toBe('https://t.me/student');
    expect(formatHttpsUrlInput('http://vk.com/student')).toBe('https://vk.com/student');
  });
});
