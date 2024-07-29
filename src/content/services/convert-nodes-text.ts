import { LangType, ParsedResult } from 'tongwen-core';
import { BgActNodeText, BgActType } from '../../service/runtime/interface';
import { runtime } from '../../service/runtime/runtime';

export const convertNodesText = (target: LangType, pns: ParsedResult[]): Promise<string[]> => {
  const req: BgActNodeText = {
    type: BgActType.NodesText,
    payload: { target, texts: pns.map(p => p.text) },
  };
  return runtime.sendMessage(req).then(({ payload: { texts } }: BgActNodeText) => texts);
};
