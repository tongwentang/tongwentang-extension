import { safeUpgradePref } from '../../preference/upgrade';
import { browser } from '../browser';
import { i18n } from '../i18n/i18n';
import { createNoti } from '../notification/create-noti';
import { BROWSER_TYPE } from '../types';
import { getStorage } from './storage';

const delayRevoke = (url: string) =>
  setTimeout(() => {
    URL.revokeObjectURL(url);
  }, 60000);

const getPrefBlobUrl = async () =>
  getStorage()
    .then(pref => safeUpgradePref(BROWSER_TYPE, pref))
    .then(pref => new Blob([JSON.stringify(pref, null, 2)], { type: 'application/json;charset=utf-8' }))
    .then(blob => URL.createObjectURL(blob))
    .then(url => (delayRevoke(url), url));

const exportWithDownloads = async () =>
  getPrefBlobUrl()
    .then(url => ({ url, filename: 'tongwentang-pref.json', saveAs: true }))
    .then(async option => browser.downloads!.download(option));

const exportWithAnchor = async () =>
  getPrefBlobUrl().then(url => {
    if (typeof document === 'undefined') {
      throw new Error('Document is unavailable');
    }

    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'tongwentang-pref.json';
    anchor.style.display = 'none';
    document.body.append(anchor);
    anchor.click();
    anchor.remove();
  });

export const exportPref = async () =>
  (browser.downloads?.download ? exportWithDownloads() : exportWithAnchor()).catch(async () => {
    try {
      await exportWithAnchor();
    } catch {
      await createNoti(i18n.getMessage('MSG_EXPORT_FAILED'));
    }
  });
