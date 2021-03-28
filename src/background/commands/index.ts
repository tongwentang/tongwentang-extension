import { LangType } from 'tongwen-core';
import { commands } from '../../service/commands/commands';
import { CommandType } from '../../service/commands/type';
import { CtActType, CtActWebPage } from '../../service/runtime/interface';
import { tabs } from '../../service/tabs/tabs';
import { convertClipboard } from '../clipboard';
import { BgState } from '../state';

const genContentAction = (type: LangType): CtActWebPage => ({
  type: CtActType.Webpage,
  payload: type,
});

export const mountCommandListener = (state: BgState) => {
  commands.onCommand.addListener(async command => {
    state.logger('[BG_RECEIVE_COMMAND] :', command);

    switch (command) {
      case CommandType.wS2t:
        return tabs
          .query({ active: true, currentWindow: true })
          .then(([tab]) => tab.id != null && tabs.sendMessage(tab.id!, genContentAction(LangType.s2t)));
      case CommandType.wT2s:
        return tabs
          .query({ active: true, currentWindow: true })
          .then(([tab]) => tab.id != null && tabs.sendMessage(tab.id!, genContentAction(LangType.t2s)));
      case CommandType.cS2t:
        return convertClipboard(state, LangType.s2t);
      case CommandType.cT2s:
        return convertClipboard(state, LangType.t2s);
    }
  });
};
