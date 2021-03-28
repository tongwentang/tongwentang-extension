import { getRandomId } from '../../utilities';
import { i18n } from '../i18n/i18n';
import { notifications } from './notifications';

const autoDeleteNoti = (id: string, closeIn: number) => setTimeout(() => notifications.clear(id), closeIn);

export const createNoti = (message: string, closeIn = 5000, id = getRandomId()) => {
  autoDeleteNoti(id, closeIn);

  // TODO: need i18n
  return notifications.create(id, {
    type: 'basic',
    title: i18n.getMessage('NT_TITLE'),
    message,
    iconUrl: 'icons/tongwen-icon-48.png',
  });
};
