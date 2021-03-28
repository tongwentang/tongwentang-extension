import { MaybeTransTarget } from '../../preference/types/types';
import { BgActGetTarget, BgActType } from '../../service/runtime/interface';
import { runtime } from '../../service/runtime/runtime';

type GetTarget = () => Promise<MaybeTransTarget>;
export const getTarget: GetTarget = () => {
  const req: BgActGetTarget = { type: BgActType.GetTarget, payload: undefined };
  return runtime.sendMessage(req).then(({ payload }: BgActGetTarget) => payload);
};
