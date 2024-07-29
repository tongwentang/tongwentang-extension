import { PrefMenuGroup, PrefMenuGroupKeys, PrefMenuOptions } from '../../preference/types/v2';
import { menus } from './menus';

const hasEnabled = (options: PrefMenuOptions) => options.s2t || options.t2s;

export function getSubMenuContexts(prefKey: PrefMenuGroupKeys): menus.ContextType[] {
  return prefKey === 'textarea' ? menus.ContextOnEditable : menus.ContextOnAll;
}

export function getTopMenuContexts({ textarea, webpage }: PrefMenuGroup): menus.ContextType[] {
  const hasEditable = hasEnabled(textarea);
  const hasOther = hasEnabled(webpage);

  return hasEditable && hasOther
    ? [...menus.ContextOnAll, ...menus.ContextOnEditable]
    : hasEditable
      ? menus.ContextOnEditable
      : hasOther
        ? menus.ContextOnAll
        : [];
}
