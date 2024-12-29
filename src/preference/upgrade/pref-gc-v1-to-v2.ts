import { LangType } from 'tongwen-core/dictionaries';
import { getRandomId } from '../../utilities';
import { getDefaultPref } from '../default';
import { patternRegExpify, regularOldPattern } from '../filter-rule';
import type { PrefGcV1, PrefGcV1FilterRule } from '../types/v1';
import type { FilterTarget, PrefFilterRule, PrefV2 } from '../types/v2';

const TargetConverter = {
  none: 'disabled' as const,
  trad: LangType.s2t,
  simp: LangType.t2s,
  auto: 'auto' as const,
};

const filterList2Rules = (rules: PrefGcV1FilterRule[]): PrefFilterRule[] =>
  rules.map(rule => {
    const pattern = regularOldPattern(rule.url);
    return {
      id: getRandomId(),
      pattern,
      target: TargetConverter[rule.zhflag] as FilterTarget,
      regexp: patternRegExpify(pattern),
    };
  });

export function prefGcV1ToV2(v1Pref: PrefGcV1): PrefV2 {
  const pref = getDefaultPref();
  return {
    version: 2,
    meta: { update: Date.now() },
    general: {
      autoConvert: TargetConverter[v1Pref.autoConvert],
      browserAction: TargetConverter[v1Pref.iconAction],
      defaultTarget: LangType.s2t,
      spaMode: true,
      updateLangAttr: false,
      debugMode: false,
    },
    menu: {
      enabled: v1Pref.contextMenu.enable,
      group: {
        textarea: { s2t: true, t2s: true },
        webpage: { s2t: true, t2s: true },
      },
    },
    filter: {
      enabled: v1Pref.urlFilter.enable,
      rules: filterList2Rules(v1Pref.urlFilter.list),
    },
    word: {
      default: pref.word.default,
      custom: {
        s2t: v1Pref.userPhrase.trad,
        t2s: v1Pref.userPhrase.simp,
      },
    },
  };
}
