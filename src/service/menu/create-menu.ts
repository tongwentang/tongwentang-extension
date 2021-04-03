import { isNil } from 'ramda';
import { LangType } from 'tongwen-core';
import { BgState } from '../../background/state';
import { PrefMenuGroupKeys, PrefMenuOptions } from '../../preference/types/v2';
import { i18n } from '../i18n/i18n';
import { CtAct, CtActTextArea, CtActType, CtActWebPage } from '../runtime/interface';
import { tabs } from '../tabs/tabs';
import { getSubMenuContexts, getTopMenuContexts } from './determine-context';
import { menus } from './menus';

export type MenuId = string | number;

const createOnClickCb = (req: CtAct) => (_: menus.OnClickData, tab: tabs.Tab) =>
  tab.id && tabs.sendMessage(tab.id, req);

const createOnClickCbBy = (
  funcKey: PrefMenuGroupKeys,
  target: LangType,
): ((_: menus.OnClickData, tab: tabs.Tab) => void) => {
  switch (funcKey) {
    case 'textarea': {
      const req: CtActTextArea = { type: CtActType.Textarea, payload: target };
      return createOnClickCb(req);
    }
    case 'webpage': {
      const req: CtActWebPage = { type: CtActType.Webpage, payload: target };
      return createOnClickCb(req);
    }
  }
};

function createSubMenu(parentId: MenuId, funcKey: PrefMenuGroupKeys, settings: PrefMenuOptions) {
  Object.entries(settings)
    .filter(([, enabled]) => enabled)
    .forEach(([target]) => {
      const menuProps: menus.CreateProperties = {
        parentId,
        type: 'normal',
        title: `${i18n.getMessage(`MSG_${funcKey}_${target}`)}`,
        contexts: getSubMenuContexts(funcKey),
        onclick: createOnClickCbBy(funcKey, target as LangType),
      };

      menus.create(menuProps);
    });
}

export async function createMenu(state: BgState): Promise<void> {
  !isNil(state.menuId) && (await menus.remove(state.menuId));

  const topMenuContexts = getTopMenuContexts(state.pref.menu.group);

  if (!state.pref.menu.enabled || topMenuContexts.length === 0) {
    return;
  }

  const parentMenuProp: menus.CreateProperties = {
    type: 'normal',
    title: i18n.getMessage('MSG_EXT_NAME'),
    contexts: topMenuContexts,
  };

  // eslint-disable-next-line require-atomic-updates
  state.menuId = menus.create(parentMenuProp);

  Object.entries(state.pref.menu.group).forEach(([funcKey, settings]) => {
    createSubMenu(state.menuId!, funcKey as PrefMenuGroupKeys, settings);
  });
}
