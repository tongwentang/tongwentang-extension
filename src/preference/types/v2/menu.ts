import { TransTarget } from '../types';

export type PrefMenuOptions = Record<TransTarget, boolean>;

export type PrefMenuGroupKeys = 'textarea' | 'webpage';

export type PrefMenuGroup = Record<PrefMenuGroupKeys, PrefMenuOptions>;

export interface PrefMenu {
  enabled: boolean;
  group: PrefMenuGroup;
}
