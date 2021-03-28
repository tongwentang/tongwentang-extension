import { LangType } from 'tongwen-core';
import { BgActConvert, BgActType } from '../../service/runtime/interface';
import { runtime } from '../../service/runtime/runtime';

export const handleTextarea = (target: LangType) => {
  const elm = document.activeElement as HTMLInputElement;

  if (elm && ['INPUT', 'TEXTAREA'].includes(elm.nodeName)) {
    const msg: BgActConvert = {
      type: BgActType.Convert,
      payload: { target, text: elm.value },
    };

    runtime
      .sendMessage(msg)
      .then(({ payload: { text } }: BgActConvert) => text)
      .then(converted => (elm.value = converted));
  }
};
