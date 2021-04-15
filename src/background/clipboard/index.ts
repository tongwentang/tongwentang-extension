import { tap } from 'ramda';
import { LangType } from 'tongwen-core';
import { i18n } from '../../service/i18n/i18n';
import { createNoti } from '../../service/notification/create-noti';
import { permissions } from '../../service/permissions/permissions';
import { BgState } from '../state';

const convertClipboardContent = (state: BgState, target: LangType): Promise<void> =>
  navigator.clipboard
    .readText()
    .then(text => state.converter.phrase(target, text))
    .then(text => navigator.clipboard.writeText(text));

// TODO: i18n
export const convertClipboard = (state: BgState, target: LangType): Promise<void> =>
  permissions
    .request({ permissions: ['clipboardRead', 'clipboardWrite'] })
    .then(tap(isGet => isGet && convertClipboardContent(state, target)))
    .then(isGet => {
      createNoti(
        i18n.getMessage(!isGet ? 'NT_GRT_PRM_DENIED' : target === LangType.s2t ? 'NT_CLB_TO_S2T' : 'NT_CLB_TO_T2S'),
      );
    })
    .catch(() => void createNoti(i18n.getMessage('NT_GRT_PRM_ONLY_USR_INTER')));
