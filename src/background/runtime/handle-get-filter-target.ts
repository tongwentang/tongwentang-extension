import { isRegExpLike } from '../../preference/filter-rule';
import type { Pref } from '../../preference/types/lastest';
import { FilterTarget, PrefFilterRule } from '../../preference/types/v2';

const findRule = (rules: PrefFilterRule[], url: URL) =>
  rules.find(rule =>
    !rule.regexp ? false : isRegExpLike(rule.pattern) ? rule.regexp.test(url.href) : rule.regexp.test(url.host),
  );

export const getTargetByFilter = (pref: Pref, url: string): FilterTarget | undefined => {
  const rule = pref.filter.enabled ? findRule(pref.filter.rules, new URL(url)) : undefined;

  return rule ? rule.target : undefined;
};
