import { LangType } from 'tongwen-core/dictionaries';
import { Menus } from 'webextension-polyfill';
import { getSessionState, setSessionState } from '../../background/session';
import type { Pref } from '../../preference/types/lastest';
import { PrefMenuGroupKeys, PrefMenuOptions } from '../../preference/types/v2';
import { browser } from '../browser';
import { i18n } from '../i18n/i18n';
import { getSubMenuContexts, getTopMenuContexts } from './determine-context';

export type MenuId = string | number;
export type ContextMenuChildrenId = `${PrefMenuGroupKeys}_${LangType}`;

export const TOP_CONTEXT_MENU_ID = 'top_context_menu_id';

function createSubMenu(parentId: MenuId, funcKey: PrefMenuGroupKeys, settings: PrefMenuOptions) {
  Object.entries(settings)
    .filter(([, enabled]) => enabled)
    .forEach(([target]) => {
      const menuProps: Menus.CreateCreatePropertiesType = {
        parentId,
        id: `${funcKey}_${target}`,
        type: 'normal',
        title: `${i18n.getMessage(`MSG_${funcKey}_${target}`)}`,
        contexts: getSubMenuContexts(funcKey),
      };

      browser.contextMenus.create(menuProps);
    });
}

export function createMenu(menu: Pref['menu']): Promise<unknown> {
  return getSessionState()
    .then(state => (state.menuId != null ? browser.contextMenus.remove(state.menuId) : Promise.resolve(null)))
    .then(() => menu.enabled && getTopMenuContexts(menu.group))
    .then(
      contexts =>
        contexts &&
        browser.contextMenus.create({
          id: TOP_CONTEXT_MENU_ID,
          type: 'normal',
          title: i18n.getMessage('MSG_EXT_NAME'),
          contexts,
        }),
    )
    .then(menuId =>
      menuId === false
        ? Promise.resolve(null)
        : Promise.all([
            setSessionState({ menuId }),
            Object.entries(menu.group).forEach(([funcKey, settings]) =>
              createSubMenu(menuId, funcKey as PrefMenuGroupKeys, settings),
            ),
          ]),
    );
}
