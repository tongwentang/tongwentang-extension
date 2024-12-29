import type { DicObj } from 'tongwen-core/dictionaries';

export interface PrefGcV1FilterRule {
  url: string;
  zhflag: 'none' | 'trad' | 'simp';
}

export interface PrefGcV1 {
  /** 1.x float number as string */
  version: string;
  autoConvert: 'none' | 'trad' | 'simp';
  iconAction: 'auto' | 'trad' | 'simp';
  symConvert: boolean;
  inputConvert: 'none' | 'auto' | 'trad' | 'simp';
  fontCustom: { enable: boolean; trad: string; simp: string };
  urlFilter: { enable: boolean; list: PrefGcV1FilterRule[] };
  userPhrase: { enable: boolean; trad: DicObj; simp: DicObj };
  contextMenu: { enable: boolean };
}
