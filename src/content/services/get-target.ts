import type { MaybeTransTarget } from '../../preference/types/types';
import { dispatchBgAction } from '../../service/runtime/background';

type GetTarget = () => Promise<MaybeTransTarget>;
export const getTarget: GetTarget = async () => {
  return dispatchBgAction({ type: 'GetTarget', payload: undefined });
};
