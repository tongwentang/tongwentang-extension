import { LangType } from 'tongwen-core';
import { MaybeTransTarget } from '../../preference/types/types';
import { BgActAutoConvert } from '../../service/runtime/interface';
import { detectLanguage } from '../../service/tabs/detect-language';
import { ZhType } from '../../service/tabs/tabs.constant';
import { BgState } from '../state';

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

type GetTargetByAutoConvert = (s: BgState, tabId: number) => Promise<MaybeTransTarget>;
export const getTargetByAutoConvert: GetTargetByAutoConvert = (state, tabId) => {
  switch (state.pref.general.autoConvert) {
    case LangType.s2t:
    case LangType.t2s:
      return Promise.resolve(state.pref.general.autoConvert);
    case 'ds2t':
      return getTargetByDetectLanguage(tabId, LangType.s2t);
    case 'dt2s':
      return getTargetByDetectLanguage(tabId, LangType.t2s);
    case 'disabled':
      return Promise.resolve(undefined);
  }
};

type HandleGetAutoConvert = (s: BgState, r: BgActAutoConvert, id: number) => Promise<BgActAutoConvert>;
export const handleGetAutoConvert: HandleGetAutoConvert = (state, req, tabId) =>
  getTargetByAutoConvert(state, tabId).then(target => ({ ...req, payload: target }));
