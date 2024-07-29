import { isRegExpLike } from '../../preference/filter-rule';
import { FilterTarget, PrefFilterRule } from '../../preference/types/v2';
import { BgState } from '../state';

const findRule = (rules: PrefFilterRule[], url: URL) =>
  rules.find(rule =>
    !rule.regexp ? false : isRegExpLike(rule.pattern) ? rule.regexp.test(url.href) : rule.regexp.test(url.host),
  );

type GetTargetByFilter = (s: BgState, u: string) => FilterTarget | undefined;
export const getTargetByFilter: GetTargetByFilter = (state, url) => {
  const rule = state.pref.filter.enabled ? findRule(state.pref.filter.rules, new URL(url)) : undefined;

  return rule ? rule.target : undefined;
};
