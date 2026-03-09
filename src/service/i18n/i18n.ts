import browser from 'webextension-polyfill';
import enMessages from '../../_locales/en/messages.json';
import zhTWMessages from '../../_locales/zh_TW/messages.json';

type MessageEntry = {
  message: string;
};

type MessageMap = Record<string, MessageEntry>;

const FALLBACK_MESSAGES = {
  en: enMessages as MessageMap,
  zh_TW: zhTWMessages as MessageMap,
} as const;

const DEFAULT_LOCALE = 'en';

const toArray = (substitutions?: string | string[]) => {
  if (substitutions == null) {
    return [];
  }

  return Array.isArray(substitutions) ? substitutions : [substitutions];
};

const applySubstitutions = (message: string, substitutions?: string | string[]) =>
  toArray(substitutions).reduce(
    (value, substitution, index) => value.replaceAll(`$${index + 1}`, substitution),
    message.replaceAll('$$', '$'),
  );

const getFallbackLocale = () => {
  const candidates = [browser.i18n.getUILanguage?.(), ...(navigator.languages || []), navigator.language]
    .filter(Boolean)
    .map(locale => locale.replace('-', '_'));

  for (const locale of candidates) {
    if (locale in FALLBACK_MESSAGES) {
      return locale as keyof typeof FALLBACK_MESSAGES;
    }

    if (locale.startsWith('zh')) {
      return 'zh_TW';
    }

    if (locale.startsWith('en')) {
      return 'en';
    }
  }

  return DEFAULT_LOCALE;
};

const getFallbackMessage = (name: string, substitutions?: string | string[]) => {
  const locale = getFallbackLocale();
  const message = FALLBACK_MESSAGES[locale][name]?.message ?? FALLBACK_MESSAGES[DEFAULT_LOCALE][name]?.message ?? name;
  return applySubstitutions(message, substitutions);
};

const getMessage = (name: string, substitutions?: string | string[]) => {
  try {
    const message = browser.i18n.getMessage(name, substitutions as never);

    if (message) {
      return message;
    }
  } catch {
    return getFallbackMessage(name, substitutions);
  }

  return getFallbackMessage(name, substitutions);
};

export const i18n = {
  getMessage,
};
