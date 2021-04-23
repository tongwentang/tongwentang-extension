import { Holder } from 'data-fixer';
import { safeUpgradePref, validatePref } from '../../preference/upgrade';
import { i18n } from '../i18n/i18n';
import { createNoti } from '../notification/create-noti';
import { BrowserType } from '../types';
import { storage } from './storage';

const parseJson = (raw: string) =>
  Promise.resolve(JSON.parse(raw)).catch(() => Promise.reject(i18n.getMessage('MSG_JSON_ERROR')));

const confirmFix = () => confirm(i18n.getMessage('MSG_CONFIRM_FIX_IMPORT'));

const getValidPref = (type: BrowserType) => (holder: Holder<any>) => {
  if (holder.invalid && !confirmFix()) {
    throw i18n.getMessage('MSG_IMPORT_CANCELED');
  }
  return safeUpgradePref(type, holder.value());
};

export const importPref = (type: BrowserType, raw: string): Promise<string> =>
  parseJson(raw)
    .then(validatePref(type))
    .then(getValidPref(type))
    .then(storage.set)
    .then(() => createNoti(i18n.getMessage('MSG_IMPORT_COMPLETED')))
    .catch(() => createNoti(i18n.getMessage('MSG_IMPORT_FAILED')));
