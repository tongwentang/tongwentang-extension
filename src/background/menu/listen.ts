import { LangType } from 'tongwen-core/dictionaries';
import { browser } from '../../service/browser';
import type { ContextMenuChildrenId } from '../../service/menu/create-menu';
import { dispatchCtAction } from '../../service/runtime/content';
import { convertClipboard } from '../clipboard';
import { bgLog } from '../logger';
import { addDomainToRules, type ActionMenuId } from './browser-action';

export const listenMenusEvent = () => {
  browser.contextMenus.onClicked.addListener((info, tab) => {
    bgLog('[BG_RECEIVED_MENU_EVENT]: ', { info, tab });

    switch (info.menuItemId as ActionMenuId | ContextMenuChildrenId) {
      case 'domain_disabled':
        return tab && addDomainToRules('disabled', tab);
      case 'domain_s2t':
        return tab && addDomainToRules(LangType.s2t, tab);
      case 'domain_t2s':
        return tab && addDomainToRules(LangType.t2s, tab);
      case 'options':
        return browser.runtime.openOptionsPage();
      case 'clipboard_s2t':
        return convertClipboard(LangType.s2t);
      case 'clipboard_t2s':
        return convertClipboard(LangType.t2s);
      case 'textarea_s2t':
        return typeof tab?.id === 'number' && dispatchCtAction({ type: 'Textarea', payload: LangType.s2t }, tab.id);
      case 'textarea_t2s':
        return typeof tab?.id === 'number' && dispatchCtAction({ type: 'Textarea', payload: LangType.t2s }, tab.id);
      case 'webpage_s2t':
        return typeof tab?.id === 'number' && dispatchCtAction({ type: 'Webpage', payload: LangType.s2t }, tab.id);
      case 'webpage_t2s':
        return typeof tab?.id === 'number' && dispatchCtAction({ type: 'Webpage', payload: LangType.t2s }, tab.id);
    }
  });
};
