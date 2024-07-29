import { LangType } from 'tongwen-core';
import { Menus } from 'webextension-polyfill';
import { BgState } from '../../background/state';
import { PrefMenuGroupKeys, PrefMenuOptions } from '../../preference/types/v2';
import { browser } from '../browser';
import { i18n } from '../i18n/i18n';
import { ReqAction } from '../runtime/action';
import { CtActionMap, dispatchCtAction } from '../runtime/content';
import { getSubMenuContexts, getTopMenuContexts } from './determine-context';

export type MenuId = string | number;

const createMenuClickHandler =
  (
    action: ReqAction<Pick<CtActionMap, 'Textarea' | 'Webpage'>>,
  ): NonNullable<Menus.CreateCreatePropertiesType['onclick']> =>
  (_, tab) =>
    typeof tab.id === 'number' && dispatchCtAction(action, tab.id);

const createMenuClickWith = (
  funcKey: PrefMenuGroupKeys,
  target: LangType,
): NonNullable<Menus.CreateCreatePropertiesType['onclick']> => {
  switch (funcKey) {
    case 'textarea': {
      return createMenuClickHandler({ type: 'Textarea', payload: target });
    }
    case 'webpage': {
      return createMenuClickHandler({ type: 'Webpage', payload: target });
    }
  }
};

function createSubMenu(parentId: MenuId, funcKey: PrefMenuGroupKeys, settings: PrefMenuOptions) {
  Object.entries(settings)
    .filter(([, enabled]) => enabled)
    .forEach(([target]) => {
      const menuProps: Menus.CreateCreatePropertiesType = {
        parentId,
        type: 'normal',
        title: `${i18n.getMessage(`MSG_${funcKey}_${target}`)}`,
        contexts: getSubMenuContexts(funcKey),
        onclick: createMenuClickWith(funcKey, target as LangType),
      };

      browser.menus.create(menuProps);
    });
}

export async function createMenu(state: BgState): Promise<void> {
  !(state.menuId == null) && (await browser.menus.remove(state.menuId));

  const topMenuContexts = getTopMenuContexts(state.pref.menu.group);

  if (!state.pref.menu.enabled || topMenuContexts.length === 0) {
    return;
  }

  const parentMenuProp: Menus.CreateCreatePropertiesType = {
    type: 'normal',
    title: i18n.getMessage('MSG_EXT_NAME'),
    contexts: topMenuContexts,
  };

  // eslint-disable-next-line require-atomic-updates
  state.menuId = browser.menus.create(parentMenuProp);

  Object.entries(state.pref.menu.group).forEach(([funcKey, settings]) => {
    createSubMenu(state.menuId!, funcKey as PrefMenuGroupKeys, settings);
  });
}
