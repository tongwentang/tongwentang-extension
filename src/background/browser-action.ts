import { LangType } from 'tongwen-core';
import { browser } from '../service/browser';
import { dispatchCtAction } from '../service/runtime/content';
import { ZhType } from '../service/tabs/tabs.constant';
import { BgState } from './state';

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

export function mountBrowserActionListener(state: BgState): void {
  browser.browserAction.onClicked.addListener(tab => {
    state.logger('[ACTION_RECEIVE_REQ] req:', { tab, state });
    if (typeof tab.id !== 'number') return;

    const ba = state.pref.general.browserAction;
    const fb = state.pref.general.defaultTarget;
    return Promise.resolve(ba === 'auto' ? getTargetByDetection(tab.id, fb) : ba).then(target =>
      dispatchCtAction({ type: 'Webpage', payload: target }, tab.id!),
    );
  });
}
