import en from '@/locales/en';
import id from '@/locales/id';

type Locale = 'en' | 'id';
const translations = { en, id };

/**
 * Server-side i18n helper.
 * This function can be used in Server Actions and other server-side code.
 */
export const i18n = (locale: Locale) => {
  const t = (key: string, values?: Record<string, string | number>): string => {
    const keys = key.split('.');
    let text = keys.reduce((obj, k) => (obj as any)?.[k], translations[locale]);
    
    if (typeof text !== 'string') {
      text = keys.reduce((obj, k) => (obj as any)?.[k], translations.en);
    }
    
    if (typeof text === 'string' && values) {
      Object.keys(values).forEach(valueKey => {
        const regex = new RegExp(`{${valueKey}}`, 'g');
        text = text.replace(regex, String(values[valueKey]));
      });
    }

    return text || key;
  };

  return { t };
};
