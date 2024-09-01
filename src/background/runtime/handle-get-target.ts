import type { Pref } from '../../preference/types/lastest';
import { MaybeTransTarget } from '../../preference/types/types';
import { FilterTarget } from '../../preference/types/v2';
import type { browser } from '../../service/browser';
import { getTargetByAutoConvert } from './handle-get-auto-convert';
import { getTargetByFilter } from './handle-get-filter-target';

// TODO: remove type assertion after Promise.then type infer bug fixed
export const getTarget = (pref: Pref, sender: browser.Runtime.MessageSender): Promise<MaybeTransTarget> =>
  Promise.resolve(getTargetByFilter(pref, sender.url!))
    .then(ft => ft || (getTargetByAutoConvert(sender.tab!.id!) as Promise<FilterTarget | undefined | MaybeTransTarget>))
    .then(ft => (ft === 'disabled' ? undefined : ft));
