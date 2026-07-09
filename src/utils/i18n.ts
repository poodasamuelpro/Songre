// Internationalisation SONGRE
export type Locale = 'fr' | 'en';

export const defaultLocale: Locale = 'fr';
export const supportedLocales: Locale[] = ['fr', 'en'];

export function detectLocale(acceptLanguage: string | null): Locale {
  if (!acceptLanguage) return defaultLocale;
  const preferred = acceptLanguage.split(',')[0].split('-')[0].toLowerCase();
  return supportedLocales.includes(preferred as Locale) ? (preferred as Locale) : defaultLocale;
}

export function getLocaleFromPath(path: string): Locale {
  const segment = path.split('/')[1];
  return supportedLocales.includes(segment as Locale) ? (segment as Locale) : defaultLocale;
}
