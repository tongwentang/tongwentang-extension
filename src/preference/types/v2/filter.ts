import { Disabled, TransTarget } from '../types';

export type FilterTarget = Disabled | TransTarget;

export type RegExpMaybe = RegExp | null;

export interface PrefFilterRule {
  id: string;
  pattern: string;
  target: FilterTarget;
  regexp: RegExpMaybe;
}

export interface PrefFilter {
  enabled: boolean;
  rules: PrefFilterRule[];
}
