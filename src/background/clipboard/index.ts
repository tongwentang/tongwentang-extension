import { LangType } from 'tongwen-core';
import { browser } from '../../service/browser';
import { i18n } from '../../service/i18n/i18n';
import { createNoti } from '../../service/notification/create-noti';
import { BgState } from '../state';

const convertClipboardContent = (state: BgState, target: LangType): Promise<void> =>
  navigator.clipboard
    .readText()
    .then(text => state.converter.phrase(target, text))
    .then(text => navigator.clipboard.writeText(text));

export const convertClipboard = (state: BgState, target: LangType): Promise<void> =>
  browser.permissions
    .request({ permissions: ['clipboardRead', 'clipboardWrite'] })
    .then(async isGet => (isGet && (await convertClipboardContent(state, target)), isGet))
    .then(isGet => {
      createNoti(
        i18n.getMessage(!isGet ? 'NT_GRT_PRM_DENIED' : target === LangType.s2t ? 'NT_CLB_TO_S2T' : 'NT_CLB_TO_T2S'),
      );
    })
    .catch(() => void createNoti(i18n.getMessage('NT_GRT_PRM_ONLY_USR_INTER')));
