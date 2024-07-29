import { safeUpgradePref } from '../../preference/upgrade';
import { downloads } from '../downloads/downloads';
import { i18n } from '../i18n/i18n';
import { createNoti } from '../notification/create-noti';
import { BROWSER_TYPE } from '../types';
import { storage } from './storage';

const delayRevoke = (url: string) => setTimeout(() => URL.revokeObjectURL(url), 60000);

export const exportPref = () =>
  storage
    .get()
    .then(pref => safeUpgradePref(BROWSER_TYPE, pref))
    .then(pref => new Blob([JSON.stringify(pref, null, 2)], { type: 'application/json;charset=utf-8' }))
    .then(blob => URL.createObjectURL(blob))
    .then(url => (delayRevoke(url), url))
    .then(url => ({ url, filename: 'tongwentang-pref.json', saveAs: true }))
    .then(downloads.download)
    .catch(() => createNoti(i18n.getMessage('MSG_EXPORT_FAILED')));
