export const CAPTCHA_MESSAGE = {
  missing: 'Форма временно недоступна: не настроена проверка безопасности.',
  required: 'Подтвердите, что вы не робот',
  expired: 'Время проверки истекло. Пройдите её ещё раз.',
  network: 'Не удалось загрузить проверку. Попробуйте ещё раз.',
  javascript: 'Не удалось запустить проверку. Обновите страницу.',
  failed: 'Проверка не пройдена. Попробуйте ещё раз.',
  unavailable: 'Сервис проверки временно недоступен. Попробуйте позднее.',
} as const;

export function getSmartCaptchaSiteKey(siteKey = import.meta.env.VITE_SMARTCAPTCHA_CLIENT_KEY): string | undefined {
  const normalizedSiteKey = siteKey?.trim();
  return normalizedSiteKey === '' || normalizedSiteKey === undefined ? undefined : normalizedSiteKey;
}
