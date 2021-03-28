import { PrefFilter, PrefGeneral, PrefMenu, PrefMeta, PrefWord } from '.';

export interface PrefV2 {
  version: 2;
  meta: PrefMeta;
  general: PrefGeneral;
  menu: PrefMenu;
  filter: PrefFilter;
  word: PrefWord;
}
