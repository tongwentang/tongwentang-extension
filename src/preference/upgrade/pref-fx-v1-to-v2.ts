import { LangType } from 'tongwen-core';
import { getRandomId } from '../../utilities';
import { getDefaultPref } from '../default';
import { patternRegExpify, regularOldPattern } from '../filter-rule';
import { PrefFxV1, PrefFxV1Filter, V1PrefFxActionEnum, V1PrefFxAutoConverterEnum } from '../types/v1';
import { AutoConvertOpt, BrowserActionOpt, FilterTarget, PrefFilterRule, PrefV2 } from '../types/v2';

const filters2Rules = (rules: PrefFxV1Filter[]): PrefFilterRule[] =>
  rules.map(rule => {
    const pattern = regularOldPattern(rule.url);
    return {
      id: getRandomId(),
      pattern,
      target: V1PrefFxActionEnum[rule.action] as FilterTarget,
      regexp: patternRegExpify(pattern),
    };
  });

// TODO: fallback handler
export function prefFxV1ToV2(v1Pref: PrefFxV1): PrefV2 {
  const pref = getDefaultPref();
  return {
    version: 2,
    meta: { update: Date.now() },
    general: {
      autoConvert: V1PrefFxAutoConverterEnum[v1Pref.autoConvert] as AutoConvertOpt,
      browserAction: V1PrefFxActionEnum[v1Pref.iconAction] as BrowserActionOpt,
      defaultTarget: LangType.s2t,
      spaMode: true,
      updateLangAttr: false,
      debugMode: false,
    },
    menu: {
      enabled: v1Pref.contextMenuEnabled,
      group: {
        textarea: {
          s2t: v1Pref.contextMenuInput2Trad,
          t2s: v1Pref.contextMenuInput2Simp,
        },
        webpage: {
          s2t: v1Pref.contextMenuPage2Trad,
          t2s: v1Pref.contextMenuPage2Simp,
        },
      },
    },
    filter: {
      enabled: v1Pref.urlFilterEnabled,
      rules: filters2Rules(v1Pref.urlFilterList),
    },
    word: {
      default: pref.word.default,
      custom: {
        s2t: v1Pref.userPhraseTradList,
        t2s: v1Pref.userPhraseSimpList,
      },
    },
  };
}
