import { always, evolve } from 'ramda';
import { getDefaultPref } from '../../preference/default';
import { i18n } from '../i18n/i18n';
import { createNoti } from '../notification/create-noti';
import { storage } from './storage';

const confirmReset = (msg: string) => confirm(msg);

export const confirmResetPref = async (): Promise<void> =>
  confirmReset(i18n.getMessage('MSG_CONFIRM_RESET_ALL'))
    ? storage
        .reset()
        .then(() => void createNoti(i18n.getMessage('MSG_PREF_RESET_COMPLETED')))
        .catch(() => void createNoti(i18n.getMessage('MSG_PREF_RESET_FAILED')))
    : undefined;

const extractCustom = () => storage.get().then(({ word: { custom } }) => custom);

export const confirmResetPrefKeep = async (): Promise<void> =>
  confirmReset(i18n.getMessage('MSG_CONFIRM_RESET'))
    ? extractCustom()
        .then(custom => evolve({ word: { custom: always(custom) } })(getDefaultPref()))
        .then(storage.set)
        .then(() => void createNoti(i18n.getMessage('MSG_PREF_RESET_COMPLETED')))
        .catch(() => void createNoti(i18n.getMessage('MSG_PREF_RESET_FAILED')))
    : undefined;
