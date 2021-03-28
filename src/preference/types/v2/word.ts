import { DicObj, LangType } from 'tongwen-core';

export interface PrefWordItem {
  name: string;
  url: string;
  enabled: boolean;
  type: LangType;
  map: DicObj;
}

export type PrefWordDefault = Record<LangType, Record<'char' | 'phrase', boolean>>;

export type PrefWordCustom = Record<LangType, Record<string, string>>;

export interface PrefWord {
  default: PrefWordDefault;
  custom: PrefWordCustom;
}
