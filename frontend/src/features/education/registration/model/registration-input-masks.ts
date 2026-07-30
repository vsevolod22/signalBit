const PHONE_COUNTRY_CODE = '7';
const PHONE_LOCAL_DIGIT_COUNT = 10;

export function formatBirthDateInput(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 8);
  const parts = [digits.slice(0, 2), digits.slice(2, 4), digits.slice(4, 8)].filter((part) => part.length > 0);

  return parts.join('.');
}

export function formatRussianPhoneInput(value: string): string {
  const digits = value.replace(/\D/g, '');
  const localDigits = digits.startsWith(PHONE_COUNTRY_CODE) || digits.startsWith('8') ? digits.slice(1) : digits;
  const normalizedDigits = localDigits.slice(0, PHONE_LOCAL_DIGIT_COUNT);
  const areaCode = normalizedDigits.slice(0, 3);
  const firstPart = normalizedDigits.slice(3, 6);
  const secondPart = normalizedDigits.slice(6, 8);
  const thirdPart = normalizedDigits.slice(8, 10);
  let formattedValue = '+7';

  if (areaCode.length > 0) formattedValue += ` ${areaCode}`;
  if (firstPart.length > 0) formattedValue += ` ${firstPart}`;
  if (secondPart.length > 0) formattedValue += `-${secondPart}`;
  if (thirdPart.length > 0) formattedValue += `-${thirdPart}`;

  return formattedValue;
}

export function formatHttpsUrlInput(value: string): string {
  const normalizedValue = value.trimStart();

  if (normalizedValue === '' || normalizedValue === 'https://' || normalizedValue === 'http://') {
    return 'https://';
  }

  if (normalizedValue.startsWith('https://')) {
    return normalizedValue;
  }

  if (normalizedValue.startsWith('http://')) {
    return `https://${normalizedValue.slice('http://'.length)}`;
  }

  return `https://${normalizedValue.replace(/^\/+/, '')}`;
}
