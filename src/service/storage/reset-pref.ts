import { getDefaultPref } from '../../preference/default';
import { i18n } from '../i18n/i18n';
import { createNoti } from '../notification/create-noti';
import { getStorage, resetStorage, setStorage } from './storage';

const confirmReset = (msg: string) => confirm(msg);

export const confirmResetPref = async (): Promise<void> =>
  confirmReset(i18n.getMessage('MSG_CONFIRM_RESET_ALL'))
    ? resetStorage()
        .then(() => void createNoti(i18n.getMessage('MSG_PREF_RESET_COMPLETED')))
        .catch(() => void createNoti(i18n.getMessage('MSG_PREF_RESET_FAILED')))
    : undefined;

const extractCustom = async () => getStorage().then(({ word: { custom } }) => custom);

export const confirmResetPrefKeep = async (): Promise<void> =>
  confirmReset(i18n.getMessage('MSG_CONFIRM_RESET'))
    ? extractCustom()
        .then(custom => (pref => ((pref.word.custom = custom), pref))(getDefaultPref()))
        .then(setStorage)
        .then(() => void createNoti(i18n.getMessage('MSG_PREF_RESET_COMPLETED')))
        .catch(() => void createNoti(i18n.getMessage('MSG_PREF_RESET_FAILED')))
    : undefined;
