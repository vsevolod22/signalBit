export function isDesktopUserAgent(userAgent: string): boolean {
  const normalizedUserAgent = userAgent.toLocaleLowerCase();

  return !normalizedUserAgent.includes('iphone') && !normalizedUserAgent.includes('android');
}
