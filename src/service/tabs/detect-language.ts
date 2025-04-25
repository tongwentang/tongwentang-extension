import { browser } from '../browser';
import { ZhType } from './tabs.constant';
import type { PrefV2 } from '../../preference/types/v2';

const langToZhtype = (lang: string, p: PrefV2): ZhType =>
  p.filter.chsTags.find(tag => tag === lang) ? ZhType.hans : p.filter.chtTags.find(tag => tag === lang) ? ZhType.hant : ZhType.und;

export const detectLanguage = async (pref: PrefV2, tag: string, tabId?: number): Promise<ZhType> => {
  let type = await browser.tabs
    .detectLanguage?.(tabId)
    .then(lang => lang.toLowerCase())
    .then(lang => langToZhtype(lang, pref))
    // INFO: some browsers may fail with detect language api
    .catch(() => ZhType.und) || ZhType.und;
  if (type === ZhType.und && tag) {
    type = langToZhtype(tag.toLowerCase(), pref);
  }
  return Promise.resolve(type);
}
