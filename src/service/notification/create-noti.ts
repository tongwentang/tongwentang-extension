import { getRandomId } from '../../utilities';
import { browser } from '../browser';
import { i18n } from '../i18n/i18n';

const autoDeleteNoti = (id: string, closeIn: number) => setTimeout(async () => browser.notifications.clear(id), closeIn);

export const createNoti = async (message: string, closeIn = 5000, id = getRandomId()) => {
  autoDeleteNoti(id, closeIn);

  // TODO: need i18n
  return browser.notifications.create(id, {
    type: 'basic',
    title: i18n.getMessage('NT_TITLE'),
    message,
    iconUrl: 'icons/tongwen-icon-48.png',
  });
};
