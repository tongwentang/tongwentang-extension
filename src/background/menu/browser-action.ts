import { assoc, pipe } from 'ramda';
import { LangType } from 'tongwen-core';
import { isUrlPattern } from '../../preference/filter-rule';
import { FilterTarget } from '../../preference/types/v2';
import { i18n } from '../../service/i18n/i18n';
import { menus } from '../../service/menu/menus';
import { runtime } from '../../service/runtime/runtime';
import { addFilterRule } from '../../service/storage/local';
import { tabs } from '../../service/tabs/tabs';
import { getHostName, getRandomId } from '../../utilities';
import { convertClipboard } from '../clipboard';
import { BgState } from '../state';

// TODO: handle for none http protocol url
type AddDomainToRule = (t: FilterTarget) => (i: menus.OnClickData, t: tabs.Tab) => void;
const addDomainToRules: AddDomainToRule = target => (_, tab) => {
  isUrlPattern(tab.url!) &&
    addFilterRule({
      target,
      regexp: null,
      id: getRandomId(),
      pattern: getHostName(tab.url!),
    });
};

const createBrowserActionProperties: () => menus.CreateProperties[] = () => [
  {
    title: i18n.getMessage('MSG_ADD_DOMAIN_TO_DISABLED'),
    onclick: addDomainToRules('disabled'),
  },
  {
    title: i18n.getMessage('MSG_ADD_DOMAIN_TO_S2T'),
    onclick: addDomainToRules(LangType.s2t),
  },
  {
    title: i18n.getMessage('MSG_ADD_DOMAIN_TO_T2S'),
    onclick: addDomainToRules(LangType.t2s),
  },
  {
    title: i18n.getMessage('MSG_OPTION'),
    onclick: () => runtime.openOptionsPage(),
  },
];

const reqConvertClipboard = (state: BgState, target: LangType) => () => convertClipboard(state, target);

const createClipboardProperties: (s: BgState) => menus.CreateProperties[] = state => [
  {
    title: i18n.getMessage('MSG_CONVERT_CLIPBOARD_S2T'),
    onclick: reqConvertClipboard(state, LangType.s2t),
  },
  {
    title: i18n.getMessage('MSG_CONVERT_CLIPBOARD_T2S'),
    onclick: reqConvertClipboard(state, LangType.t2s),
  },
];

// TODO: need icon
export async function createBrowserActionMenus(state: BgState): Promise<(string | number)[]> {
  const browserActionMenuItems: menus.CreateProperties[] = [
    ...createBrowserActionProperties(),
    ...createClipboardProperties(state),
  ].map(
    pipe(
      assoc<menus.ContextType[], 'contexts'>('contexts', ['browser_action']),
      assoc<menus.ItemType, 'type'>('type', 'normal'),
    ),
  );

  return Promise.all(browserActionMenuItems.map(item => menus.create(item)));
}
