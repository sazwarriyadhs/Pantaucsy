
'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import en from '@/locales/en';
import id from '@/locales/id';

type Locale = 'en' | 'id';
type Currency = 'USD' | 'IDR';

interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  t: (key: string, values?: Record<string, string | number>) => string;
  formatCurrency: (amount: number) => string;
}

const translations = { en, id };

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export const I18nProvider = ({ children }: { children: ReactNode }) => {
  const [locale, setLocale] = useState<Locale>('id');
  const [currency, setCurrency] = useState<Currency>('IDR');

  const t = (key: string, values?: Record<string, string | number>): string => {
    const keys = key.split('.');
    // Try to get translation from current locale
    let text = keys.reduce((obj, k) => (obj as any)?.[k], translations[locale]);
    // Fallback to English if not found
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

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat(locale === 'id' ? 'id-ID' : 'en-US', {
      style: 'currency',
      currency: currency,
    }).format(amount);
  };
  
  const value = {
    locale,
    setLocale: (newLocale: Locale) => setLocale(newLocale),
    currency,
    setCurrency: (newCurrency: Currency) => setCurrency(newCurrency),
    t,
    formatCurrency
  };

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

export const useI18n = (): I18nContextType => {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
};
