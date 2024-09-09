import { getRandomId } from '../../utilities';
import type { Pref } from '../types/lastest';
import { PrefFilterRule, RegExpMaybe } from '../types/v2';

export const REGEXP_PATTERN = /^\/(.+)\/([gimuy]{0,5})$/;
export const DOMAIN_PATTERN = /^[\w-]+\.([\w-]+\.)*[\w-]+$/;

export const isUrlLike = (pattern: string) => /https?:(\/?\/?)[^\s]+/.test(pattern);
export const isDomainLike = (pattern: string) => DOMAIN_PATTERN.test(pattern);
export const isRegExpLike = (pattern: string) => REGEXP_PATTERN.test(pattern);
export const isFilterPatternValid = (pattern: string) => isDomainLike(pattern) || isRegExpLike(pattern);

const escapeRegex = (str: string): string => str.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');

const createRegExpWithRegexLike = (pattern: string): RegExpMaybe => {
  try {
    const [, body = '', options = ''] = REGEXP_PATTERN.exec(pattern.trim()) || [];
    return new RegExp(body, [...new Set(options)].join(''));
  } catch (error) {
    return null;
  }
};

const createRegExpWithDomainLike = (pattern: string): RegExpMaybe => {
  try {
    return new RegExp(escapeRegex(pattern));
  } catch (error) {
    return null;
  }
};

export const patternRegExpify = (pattern: string): RegExpMaybe =>
  isRegExpLike(pattern) ? createRegExpWithRegexLike(pattern) : createRegExpWithDomainLike(pattern);

export const regularOldPattern = (pattern: string) => `/${pattern.replace(/(\W)/g, '\\$1').replace(/\\\*/g, '.*')}/`;

export const patchFilterRulesRegExp = (filter: Pref['filter']): Pref['filter'] => {
  return { ...filter, rules: filter.rules.map(r => ({ ...r, regexp: patternRegExpify(r.pattern) })) };
};

export const createFilterRule = (): PrefFilterRule => ({
  id: getRandomId(),
  pattern: '',
  target: 'disabled',
  regexp: null,
});
