import { browser } from '../../service/browser';
import { BgReqAction, handleBgReqAction } from '../../service/runtime/background';
import { detectLanguage } from '../../service/tabs/detect-language';
import { convertClipboard } from '../clipboard';
import { BgState } from '../state';
import { getTargetByAutoConvert } from './handle-get-auto-convert';
import { getTargetByFilter } from './handle-get-filter-target';
import { getTarget } from './handle-get-target';

/**
 * background message handler
 */
export function mountRuntimeListener(state: BgState) {
  browser.runtime.onMessage.addListener(async (action: BgReqAction, sender) => {
    state.logger('[BG_RECEIVE_REQ] req:', action, 'sender:', sender);

    switch (action.type) {
      case 'AutoConvert':
        return handleBgReqAction(action, getTargetByAutoConvert(state, sender.tab!.id!));
      case 'FilterTarget':
        return handleBgReqAction(action, getTargetByFilter(state, sender.url!));
      case 'GetTarget':
        return handleBgReqAction(action, getTarget(state, sender));
      case 'DetectLang':
        return handleBgReqAction(action, detectLanguage(sender.tab!.id!));
      case 'NodesText':
        return handleBgReqAction(
          action,
          action.payload.texts.map(text => state.converter.phrase(action.payload.target, text)),
        );
      case 'Convert':
        return handleBgReqAction(action, state.converter.phrase(action.payload.target, action.payload.text));
      case 'ConvertClipboard':
        return handleBgReqAction(action, convertClipboard(state, action.payload));
      case 'SpaMode':
        return handleBgReqAction(action, state.pref.general.spaMode);
      case 'Log':
        state.logger(...action.payload);
        return handleBgReqAction(action, undefined);
    }
  });
}
