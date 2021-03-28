import { LangType } from 'tongwen-core';
import { BgActConvert, BgActType } from '../../service/runtime/interface';
import { runtime } from '../../service/runtime/runtime';

export const convertText = (target: LangType, text: string): Promise<string> => {
  const req: BgActConvert = { type: BgActType.Convert, payload: { target, text } };
  return runtime.sendMessage(req).then(({ payload: { text } }: BgActConvert) => text);
};
