import { BgActLog, BgActType } from '../../service/runtime/interface';
import { runtime } from '../../service/runtime/runtime';

export const sendLog = (...params: any[]) => {
  const req: BgActLog = { type: BgActType.Log, payload: params };
  return runtime.sendMessage(req);
};
