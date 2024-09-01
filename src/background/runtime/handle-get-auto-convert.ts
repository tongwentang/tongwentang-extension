import { LangType } from 'tongwen-core';
import { MaybeTransTarget } from '../../preference/types/types';
import { detectLanguage } from '../../service/tabs/detect-language';
import { ZhType } from '../../service/tabs/tabs.constant';
import { bgGetPref } from '../state/storage';

type GetTargetByDetectLanguage = (tabId: number, t: LangType) => Promise<MaybeTransTarget>;
export const getTargetByDetectLanguage: GetTargetByDetectLanguage = (tabId, target) =>
  detectLanguage(tabId).then(zh => {
    switch (zh) {
      case ZhType.hans:
        return target === LangType.t2s ? undefined : LangType.s2t;
      case ZhType.hant:
        return target === LangType.s2t ? undefined : LangType.t2s;
      case ZhType.und:
        return target;
    }
  });

type GetTargetByAutoConvert = (tabId: number) => Promise<MaybeTransTarget>;
export const getTargetByAutoConvert: GetTargetByAutoConvert = tabId => {
  return bgGetPref().then(pref => {
    switch (pref.general.autoConvert) {
      case LangType.s2t:
      case LangType.t2s:
        return Promise.resolve(pref.general.autoConvert);
      case 'ds2t':
        return getTargetByDetectLanguage(tabId, LangType.s2t);
      case 'dt2s':
        return getTargetByDetectLanguage(tabId, LangType.t2s);
      case 'disabled':
        return Promise.resolve(undefined);
    }
  });
};
