import { MaybeTransTarget } from '../../preference/types/types';
import { FilterTarget } from '../../preference/types/v2';
import { BgActGetTarget } from '../../service/runtime/interface';
import { runtime } from '../../service/runtime/runtime';
import { BgState } from '../state';
import { getTargetByAutoConvert } from './handle-get-auto-convert';
import { getTargetByFilter } from './handle-get-filter-target';

// TODO: remove type assertion after Promise.then type infer bug fixed
type GetTarget = (s: BgState, tab: runtime.MessageSender) => Promise<MaybeTransTarget>;
export const getTarget: GetTarget = (state, sender) =>
  Promise.resolve(getTargetByFilter(state, sender.url!))
    .then(
      ft =>
        ft || (getTargetByAutoConvert(state, sender.tab!.id!) as Promise<FilterTarget | undefined | MaybeTransTarget>),
    )
    .then(ft => (ft === 'disabled' ? undefined : ft));

type HandleGetTarget = (s: BgState, r: BgActGetTarget, sd: runtime.MessageSender) => Promise<BgActGetTarget>;
export const handleGetTarget: HandleGetTarget = (state, req, sender) =>
  getTarget(state, sender).then(target => ({ ...req, payload: target }));
