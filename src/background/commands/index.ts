import { LangType } from 'tongwen-core/dictionaries';
import { browser } from '../../service/browser';
import { CommandType } from '../../service/commands/type';
import { dispatchCtAction } from '../../service/runtime/content';
import { convertClipboard } from '../clipboard';
import { bgLog } from '../logger';

export const mountCommandListener = () => {
  browser.commands?.onCommand.addListener(async cmd => {
    bgLog('[BG_RECEIVE_COMMAND]:', cmd);

    switch (cmd) {
      case CommandType.wS2t:
        return browser.tabs
          .query({ active: true, currentWindow: true })
          .then(async ([tab]) =>
            typeof tab.id === 'number'
              ? dispatchCtAction({ type: 'Webpage', payload: LangType.s2t }, tab.id)
              : Promise.resolve(undefined),
          );
      case CommandType.wT2s:
        return browser.tabs
          .query({ active: true, currentWindow: true })
          .then(async ([tab]) =>
            typeof tab.id === 'number'
              ? dispatchCtAction({ type: 'Webpage', payload: LangType.t2s }, tab.id)
              : Promise.resolve(undefined),
          );
      case CommandType.cS2t:
        return convertClipboard(LangType.s2t);
      case CommandType.cT2s:
        return convertClipboard(LangType.t2s);
    }
  });
};
