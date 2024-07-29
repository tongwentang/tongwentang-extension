import { LangType } from 'tongwen-core';
import { browser } from '../../service/browser';
import { CommandType } from '../../service/commands/type';
import { dispatchCtAction } from '../../service/runtime/content';
import { convertClipboard } from '../clipboard';
import { BgState } from '../state';

export const mountCommandListener = (state: BgState) => {
  browser.commands?.onCommand.addListener(async cmd => {
    state.logger('[BG_RECEIVE_COMMAND] :', cmd);

    switch (cmd) {
      case CommandType.wS2t:
        return browser.tabs
          .query({ active: true, currentWindow: true })
          .then(([tab]) =>
            typeof tab.id === 'number'
              ? dispatchCtAction({ type: 'Webpage', payload: LangType.s2t }, tab.id)
              : Promise.resolve(undefined),
          );
      case CommandType.wT2s:
        return browser.tabs
          .query({ active: true, currentWindow: true })
          .then(([tab]) =>
            typeof tab.id === 'number'
              ? dispatchCtAction({ type: 'Webpage', payload: LangType.t2s }, tab.id)
              : Promise.resolve(undefined),
          );
      case CommandType.cS2t:
        return convertClipboard(state, LangType.s2t);
      case CommandType.cT2s:
        return convertClipboard(state, LangType.t2s);
    }
  });
};
