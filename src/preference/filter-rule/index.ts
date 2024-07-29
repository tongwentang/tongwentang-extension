import { getRandomId } from '../../utilities';
import { PrefFilterRule, RegExpMaybe } from '../types/v2';

export const REGEXP_PATTERN = /^\/(.+)\/([gimuy]{0,5})$/;

export const DOMAIN_PATTERN = /^[\w-]+\.([\w-]+\.)*[\w-]+$/;

export const isUrlLike = (pattern: string) => /https?:(\/?\/?)[^\s]+/.test(pattern);

export const isDomainLike = (pattern: string) => DOMAIN_PATTERN.test(pattern);

export const isRegExpLike = (pattern: string) => REGEXP_PATTERN.test(pattern);

export const isFilterPatternValid = (pattern: string) => isDomainLike(pattern) || isRegExpLike(pattern);

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
    return new RegExp(pattern);
  } catch (error) {
    return null;
  }
};

export const patternRegExpify = (pattern: string): RegExpMaybe =>
  isRegExpLike(pattern) ? createRegExpWithRegexLike(pattern) : createRegExpWithDomainLike(pattern);

export const regularOldPattern = (pattern: string) => `/${pattern.replace(/(\W)/g, '\\$1').replace(/\\\*/g, '.*')}/`;

export const patchRulesRegExp = (rules: PrefFilterRule[]): PrefFilterRule[] => {
  return rules.map(rule => ({ ...rule, regexp: patternRegExpify(rule.pattern) }));
};

export const createFilterRule = (): PrefFilterRule => ({
  id: getRandomId(),
  pattern: '',
  target: 'disabled',
  regexp: null,
});
