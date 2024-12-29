import type { DicObj } from 'tongwen-core/dictionaries';

export const V1PrefFxAutoConverterEnum = ['disabled', 's2t', 't2s'];

export const V1PrefFxActionEnum = ['disabled', 'auto', 's2t', 't2s'];

enum AutoConvert {
  disabled = 0,
  s2t = 1,
  t2s = 2,
}

enum IconAction {
  auto = 1,
  s2t = 2,
  t2s = 3,
}

enum InputConvert {
  disabled = 0,
  auto = 1,
  s2t = 2,
  t2s = 3,
}

enum FilterAction {
  disabled = 0,
  s2t = 2,
  t2s = 3,
}

export interface PrefFxV1Filter {
  action: FilterAction;
  url: string;
}

export interface PrefFxV1 {
  version: 1;
  autoConvert: AutoConvert;
  iconAction: IconAction;
  inputConvert: InputConvert;
  symConvert: boolean;
  fontCustomEnabled: boolean;
  fontCustomTrad: string;
  fontCustomSimp: string;
  contextMenuEnabled: boolean;
  contextMenuInput2Trad: boolean;
  contextMenuInput2Simp: boolean;
  contextMenuPage2Trad: boolean;
  contextMenuPage2Simp: boolean;
  contextMenuClip2Trad: boolean;
  contextMenuClip2Simp: boolean;
  urlFilterEnabled: boolean;
  urlFilterList: PrefFxV1Filter[];
  userPhraseEnable: boolean;
  userPhraseTradList: DicObj;
  userPhraseSimpList: DicObj;
}
