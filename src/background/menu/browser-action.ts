import { LangType } from 'tongwen-core';
import { isUrlLike } from '../../preference/filter-rule';
import { FilterTarget } from '../../preference/types/v2';
import { browser } from '../../service/browser';
import { i18n } from '../../service/i18n/i18n';
import { addFilterRule } from '../../service/storage/local';
import { getHostName, getRandomId } from '../../utilities';
import { convertClipboard } from '../clipboard';
import { BgState } from '../state';

// TODO: handle for none http protocol url
type AddDomainToRule = (t: FilterTarget) => (i: browser.Menus.OnClickData, t: browser.Tabs.Tab) => void;
const addDomainToRules: AddDomainToRule = target => (_, tab) => {
  isUrlLike(tab.url!) &&
    addFilterRule({
      target,
      regexp: null,
      id: getRandomId(),
      pattern: getHostName(tab.url!),
    });
};

const createBrowserActionProperties: () => browser.Menus.CreateCreatePropertiesType[] = () => [
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
    onclick: () => browser.runtime.openOptionsPage(),
  },
];

const reqConvertClipboard = (state: BgState, target: LangType) => () => void convertClipboard(state, target);

const createClipboardProperties: (s: BgState) => browser.Menus.CreateCreatePropertiesType[] = state => [
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
  const browserActionMenuItems: browser.Menus.CreateCreatePropertiesType[] = [
    ...createBrowserActionProperties(),
    ...createClipboardProperties(state),
  ].map(item =>
    Object.assign(item, {
      type: 'normal',
      contexts: ['browser_action'],
    } satisfies browser.Menus.CreateCreatePropertiesType),
  );

  return Promise.all(browserActionMenuItems.map(item => browser.menus.create(item)));
}
