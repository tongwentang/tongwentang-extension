import { CtAct, CtActType } from '../../service/runtime/interface';
import { runtime } from '../../service/runtime/runtime';
import { sendLog } from '../services';
import { CtState } from '../state';
import { handleTextarea } from './handle-textarea';
import { handleWebpage } from './handle-webpage';

export const mountRuntimeListener = (state: CtState) =>
  runtime.onMessage.addListener((req: CtAct) => {
    sendLog('[CT_RECEIVE_REQ]', req);

    switch (req.type) {
      case CtActType.Webpage:
        handleWebpage(state, req.payload);
        break;
      case CtActType.Textarea:
        handleTextarea(req.payload);
        break;
      case CtActType.ZhType:
        return Promise.resolve(state.zhType);
    }
  });
