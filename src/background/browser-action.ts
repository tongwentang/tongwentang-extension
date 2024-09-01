import { LangType } from 'tongwen-core';
import { browser } from '../service/browser';
import { dispatchCtAction } from '../service/runtime/content';
import { ZhType } from '../service/tabs/tabs.constant';
import { bgLog } from './logger';
import { bgGetPref } from './state/storage';

type GetTargetByDetection = (id: number, f: LangType) => Promise<LangType>;
const getTargetByDetection: GetTargetByDetection = (id, fallback) => {
  return dispatchCtAction({ type: 'ZhType', payload: undefined }, id).then(zh => {
    switch (zh) {
      case ZhType.hans:
        return LangType.s2t;
      case ZhType.hant:
        return LangType.t2s;
      case ZhType.und:
        return fallback;
    }
  });
};

export function mountBrowserActionListener(): void {
  browser.action.onClicked.addListener(tab => {
    bgLog('[ACTION_RECEIVE_REQ] req:', { tab });
    const tabId = tab.id;
    if (typeof tabId !== 'number') return;

    return bgGetPref()
      .then(pref =>
        pref.general.browserAction === 'auto'
          ? getTargetByDetection(tabId, pref.general.defaultTarget)
          : pref.general.browserAction,
      )
      .then(target => dispatchCtAction({ type: 'Webpage', payload: target }, tabId!));
  });
}
