import { browser } from '../../service/browser';
import { dispatchBgAction } from '../../service/runtime/background';
import { CtReqAction, handleCtReqAction } from '../../service/runtime/content';
import { convertNode } from '../convert';
import { CtState } from '../state';
import { handleTextarea } from './handle-textarea';

export const mountRuntimeListener = (state: CtState) =>
  browser.runtime.onMessage.addListener(async (action: CtReqAction) => {
    dispatchBgAction({ type: 'Log', payload: ['[CT_RECEIVE_REQ]', action] });

    switch (action.type) {
      case 'Webpage':
        return handleCtReqAction(action, convertNode(state, action.payload, [document]));
      case 'Textarea':
        return handleCtReqAction(action, handleTextarea(action.payload));
      case 'ZhType':
        return handleCtReqAction(action, state.zhType);
    }
  });
