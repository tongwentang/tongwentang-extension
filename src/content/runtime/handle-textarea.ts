import type { LangType } from 'tongwen-core/dictionaries';
import { dispatchBgAction } from '../../service/runtime/background';

export const handleTextarea = async (target: LangType) => {
  const elm = document.activeElement;

  if (elm && (elm instanceof HTMLInputElement || elm instanceof HTMLTextAreaElement)) {
    return dispatchBgAction({ type: 'Convert', payload: { target, text: elm.value } }).then(
      converted => void (elm.value = converted),
    );
  }
};
