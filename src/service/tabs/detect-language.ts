import { browser } from '../browser';
import { chsTypes, chtTypes, ZhType } from './tabs.constant';

const langToZhtype = (lang: string): ZhType =>
  chsTypes.find(tag => tag === lang) ? ZhType.hans : chtTypes.find(tag => tag === lang) ? ZhType.hant : ZhType.und;

export const detectLanguage = (tabId?: number): Promise<ZhType> =>
  browser.tabs
    .detectLanguage?.(tabId)
    .then(lang => lang.toLowerCase())
    .then(langToZhtype)
    // INFO: some browsers may fail with detect language api
    .catch(() => ZhType.und) || Promise.resolve(ZhType.und);
