import { LangType } from 'tongwen-core';
import { isUrlLike } from '../../preference/filter-rule';
import { FilterTarget } from '../../preference/types/v2';
import { browser } from '../../service/browser';
import { i18n } from '../../service/i18n/i18n';
import { addFilterRule } from '../../service/storage/local';
import { getHostName, getRandomId } from '../../utilities';
import { getSessionState, setSessionState } from '../session';

// TODO: handle for none http protocol url
export const addDomainToRules = (target: FilterTarget, tab: browser.Tabs.Tab) => {
  isUrlLike(tab.url!) &&
    addFilterRule({
      target,
      regexp: null,
      id: getRandomId(),
      pattern: getHostName(tab.url!),
    });
};

export type ActionMenuId = (
  | ReturnType<typeof createBrowserActionProperties>
  | ReturnType<typeof createClipboardProperties>
)[number]['id'];

const createBrowserActionProperties = () =>
  [
    {
      id: 'domain_disabled',
      title: i18n.getMessage('MSG_ADD_DOMAIN_TO_DISABLED'),
    },
    {
      id: `domain_${LangType.s2t}`,
      title: i18n.getMessage('MSG_ADD_DOMAIN_TO_S2T'),
    },
    {
      id: `domain_${LangType.t2s}`,
      title: i18n.getMessage('MSG_ADD_DOMAIN_TO_T2S'),
    },
    {
      id: 'options',
      title: i18n.getMessage('MSG_OPTION'),
    },
  ] as const satisfies browser.Menus.CreateCreatePropertiesType[];

const createClipboardProperties = () =>
  [
    {
      id: `clipboard_${LangType.s2t}`,
      title: i18n.getMessage('MSG_CONVERT_CLIPBOARD_S2T'),
    },
    {
      id: `clipboard_${LangType.t2s}`,
      title: i18n.getMessage('MSG_CONVERT_CLIPBOARD_T2S'),
    },
  ] as const satisfies browser.Menus.CreateCreatePropertiesType[];

// TODO: need icon
export async function createBrowserActionMenus(): Promise<unknown> {
  return getSessionState().then(({ hasBrowserActionMenu }) => {
    if (hasBrowserActionMenu) return;

    const browserActionMenuItems: browser.Menus.CreateCreatePropertiesType[] = [
      ...createBrowserActionProperties(),
      ...createClipboardProperties(),
    ].map(item =>
      Object.assign(item, {
        type: 'normal',
        contexts: ['action'],
      } satisfies browser.Menus.CreateCreatePropertiesType),
    );

    const task = Promise.all(browserActionMenuItems.map(item => browser.contextMenus.create(item)));
    return Promise.resolve([task, setSessionState({ hasBrowserActionMenu: task })]);
  });
}
