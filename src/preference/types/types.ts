import { LangType } from 'tongwen-core/dictionaries';

export type Disabled = 'disabled';

export type Auto = 'auto';

export type TransTarget = LangType;

export type MaybeTransTarget = TransTarget | undefined;

export type DetTransTarget = 'ds2t' | 'dt2s';
