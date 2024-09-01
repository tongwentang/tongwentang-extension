import { PrefMenuGroup, PrefMenuGroupKeys, PrefMenuOptions } from '../../preference/types/v2';
import type { browser } from '../browser';
import { ContextOnAll, ContextOnEditable } from './menus';

const hasEnabled = (options: PrefMenuOptions) => options.s2t || options.t2s;

export function getSubMenuContexts(prefKey: PrefMenuGroupKeys): browser.Menus.ContextType[] {
  return prefKey === 'textarea' ? ContextOnEditable : ContextOnAll;
}

export function getTopMenuContexts({ textarea, webpage }: PrefMenuGroup): browser.Menus.ContextType[] {
  const hasEditable = hasEnabled(textarea);
  const hasOthers = hasEnabled(webpage);

  return hasEditable && hasOthers
    ? [...ContextOnAll, ...ContextOnEditable]
    : hasEditable
      ? ContextOnEditable
      : hasOthers
        ? ContextOnAll
        : [];
}
