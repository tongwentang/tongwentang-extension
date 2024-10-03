import type { PrefV2 } from './v2';

export type Pref = PrefV2;
export type PrefKeys = keyof Pref;
export type PrefPick<T extends PrefKeys> = Pick<Pref, T>;
