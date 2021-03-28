import { LangType } from 'tongwen-core';
import { browserAction } from '../service/browser-action/browser-action';
import { CtActType, CtActWebPage, CtActZhType } from '../service/runtime/interface';
import { tabs } from '../service/tabs/tabs';
import { ZhType } from '../service/tabs/tabs.constant';
import { BgState } from './state';

type GetTargetByDetection = (id: number, f: LangType) => Promise<LangType>;
const getTargetByDetection: GetTargetByDetection = (id, fallback) => {
  const msg: CtActZhType = { type: CtActType.ZhType, payload: ZhType.und };
  return tabs.sendMessage(id, msg).then((zh: ZhType) => {
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
  browserAction.onClicked.addListener(tab => {
    if (tab.id) {
      const ba = state.pref.general.browserAction;
      const fb = state.pref.general.defaultTarget;
      return Promise.resolve(ba === 'auto' ? getTargetByDetection(tab.id, fb) : ba)
        .then<CtActWebPage>(target => ({ type: CtActType.Webpage, payload: target }))
        .then(msg => tabs.sendMessage(tab.id!, msg));
    }
  });
}
