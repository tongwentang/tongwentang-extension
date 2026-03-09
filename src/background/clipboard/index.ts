import { LangType } from 'tongwen-core/dictionaries';
import { browser } from '../../service/browser';
import { i18n } from '../../service/i18n/i18n';
import { createNoti } from '../../service/notification/create-noti';
import { IS_SAFARI } from '../../service/types';
import { getConverter } from '../converter';

const convertClipboardContent = async (target: LangType): Promise<void> =>
  Promise.all([navigator.clipboard.readText(), getConverter()])
    .then(([text, converter]) => converter.phrase(target, text))
    .then(async text => navigator.clipboard.writeText(text));

const requestClipboardPermission = async (): Promise<boolean> => {
  if (IS_SAFARI || !browser.permissions?.request) {
    return true;
  }

  return browser.permissions.request({ permissions: ['clipboardRead', 'clipboardWrite'] });
};

export const convertClipboard = async (target: LangType): Promise<void> =>
  requestClipboardPermission()
    .then(async isGranted => {
      if (!isGranted) {
        return false;
      }

      await convertClipboardContent(target);
      return true;
    })
    .then(isGranted => {
      createNoti(
        i18n.getMessage(!isGranted ? 'NT_GRT_PRM_DENIED' : target === LangType.s2t ? 'NT_CLB_TO_S2T' : 'NT_CLB_TO_T2S'),
      );
    })
    .catch(() => void createNoti(i18n.getMessage('NT_GRT_PRM_ONLY_USR_INTER')));
