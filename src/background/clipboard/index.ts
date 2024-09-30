import { LangType } from 'tongwen-core/dictionaries';
import { browser } from '../../service/browser';
import { i18n } from '../../service/i18n/i18n';
import { createNoti } from '../../service/notification/create-noti';
import { getConverter } from '../converter';

const convertClipboardContent = async (target: LangType): Promise<void> =>
  Promise.all([navigator.clipboard.readText(), getConverter()])
    .then(([text, converter]) => converter.phrase(target, text))
    .then(async text => navigator.clipboard.writeText(text));

export const convertClipboard = async (target: LangType): Promise<void> =>
  browser.permissions
    .request({ permissions: ['clipboardRead', 'clipboardWrite'] })
    .then(async isGet => (isGet && (await convertClipboardContent(target)), isGet))
    .then(isGet => {
      createNoti(
        i18n.getMessage(!isGet ? 'NT_GRT_PRM_DENIED' : target === LangType.s2t ? 'NT_CLB_TO_S2T' : 'NT_CLB_TO_T2S'),
      );
    })
    .catch(() => void createNoti(i18n.getMessage('NT_GRT_PRM_ONLY_USR_INTER')));
