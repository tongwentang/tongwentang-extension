import { browser } from '../../service/browser';
import { BgReqAction, handleBgReqAction } from '../../service/runtime/background';
import { detectLanguage } from '../../service/tabs/detect-language';
import { convertClipboard } from '../clipboard';
import { getConverter } from '../converter';
import { bgLog } from '../logger';
import { bgGetPref } from '../state/storage';
import { getTargetByAutoConvert } from './handle-get-auto-convert';
import { getTargetByFilter } from './handle-get-filter-target';
import { getTarget } from './handle-get-target';

/**
 * background message handler
 */
export function mountRuntimeListener() {
  browser.runtime.onMessage.addListener(async (action: BgReqAction, sender) => {
    bgLog('[BG_RECEIVE_REQ] req:', action, 'sender:', sender);

    return bgGetPref().then(async pref => {
      switch (action.type) {
        case 'AutoConvert':
          return handleBgReqAction(action, getTargetByAutoConvert(sender.tab!.id!));
        case 'FilterTarget':
          return handleBgReqAction(action, getTargetByFilter(pref, sender.url!));
        case 'GetTarget':
          return handleBgReqAction(action, getTarget(pref, sender));
        case 'DetectLang':
          return handleBgReqAction(action, detectLanguage(sender.tab!.id!));
        case 'NodesText':
          return getConverter().then(converter =>
            handleBgReqAction(
              action,
              action.payload.texts.map(text => converter.phrase(action.payload.target, text)),
            ),
          );
        case 'Convert':
          return getConverter().then(converter =>
            handleBgReqAction(action, converter.phrase(action.payload.target, action.payload.text)),
          );
        case 'ConvertClipboard':
          return handleBgReqAction(action, convertClipboard(action.payload));
        case 'SpaMode':
          return handleBgReqAction(action, pref.general.spaMode);
        case 'Log':
          bgLog(...action.payload);
          return handleBgReqAction(action, undefined);
      }
    });
  });
}
