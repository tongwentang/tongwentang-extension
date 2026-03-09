import { getRandomId } from '../../utilities';
import { browser } from '../browser';
import { i18n } from '../i18n/i18n';

const autoDeleteNoti = (id: string, closeIn: number) =>
  setTimeout(async () => browser.notifications?.clear(id), closeIn);

const fallbackNotice = async (id: string, message: string): Promise<string> => {
  if (typeof window !== 'undefined' && typeof window.alert === 'function') {
    window.alert(message);
    return id;
  }

  console.info(`[${i18n.getMessage('NT_TITLE')}] ${message}`);
  return id;
};

export const createNoti = async (message: string, closeIn = 5000, id = getRandomId()): Promise<string> => {
  if (!browser.notifications?.create) {
    return fallbackNotice(id, message);
  }

  autoDeleteNoti(id, closeIn);

  return browser.notifications.create(id, {
    type: 'basic',
    title: i18n.getMessage('NT_TITLE'),
    message,
    iconUrl: 'icons/tongwen-icon-48.png',
  });
};
