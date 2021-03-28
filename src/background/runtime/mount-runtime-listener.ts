import { BgAct, BgActType } from '../../service/runtime/interface';
import { runtime } from '../../service/runtime/runtime';
import { convertClipboard } from '../clipboard';
import { BgState } from '../state';
import { handleConvert } from './handle-convert';
import { handleDetectLang } from './handle-detect-lang';
import { handleGetAutoConvert } from './handle-get-auto-convert';
import { handleGetFilterTarget } from './handle-get-filter-target';
import { handleGetTarget } from './handle-get-target';
import { handleNodeText } from './handle-node-text';

/**
 * background message handler
 */
export function mountRuntimeListener(state: BgState) {
  runtime.onMessage.addListener(
    async (req: BgAct, sender): Promise<BgAct> => {
      state.logger('[BG_RECEIVE_REQ] req:', req, 'sender:', sender);

      switch (req.type) {
        case BgActType.AutoConvertOpt:
          return handleGetAutoConvert(state, req, sender.tab!.id!);
        case BgActType.FilterTarget:
          return handleGetFilterTarget(state, req, sender.url!);
        case BgActType.GetTarget:
          return handleGetTarget(state, req, sender);
        case BgActType.DetectLang:
          return handleDetectLang(req, sender.tab!.id!);
        case BgActType.NodesText:
          return handleNodeText(state, req);
        case BgActType.Convert:
          return handleConvert(state, req);
        case BgActType.ConvertClipboard:
          return convertClipboard(state, req.payload).then(() => req);
        case BgActType.SpaMode:
          return { ...req, payload: state.pref.general.spaMode };
        case BgActType.Log:
          state.logger(...req.payload);
          return req;
      }
    },
  );
}
