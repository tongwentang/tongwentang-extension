import { actrl, Control, dctrl, vctrl } from 'data-fixer';
import { z } from 'zod';
import { PrefFxV1 } from '../../types/v1';
import { isDic, isFalse, isString, isTrue } from '../controllers';
import { vldFn } from '../validator';

const isFilterItem = dctrl({
  action: vctrl(vldFn(z.union([z.literal(0), z.literal(1), z.literal(2)])), 0),
  url: isString,
});

export const v1SchemaFx: Control<PrefFxV1> = dctrl({
  version: vctrl<1>(vldFn(z.literal(1)), 1),
  autoConvert: vctrl(vldFn(z.union([z.literal(0), z.literal(1), z.literal(2)])), 0),
  iconAction: vctrl(vldFn(z.union([z.literal(1), z.literal(2), z.literal(3)])), 1),
  inputConvert: vctrl(vldFn(z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3)])), 0),
  symConvert: isTrue,
  fontCustomEnabled: isFalse,
  fontCustomTrad: isString,
  fontCustomSimp: isString,
  contextMenuEnabled: isTrue,
  contextMenuInput2Trad: isTrue,
  contextMenuInput2Simp: isTrue,
  contextMenuPage2Trad: isTrue,
  contextMenuPage2Simp: isTrue,
  contextMenuClip2Trad: isTrue,
  contextMenuClip2Simp: isTrue,
  urlFilterEnabled: isTrue,
  urlFilterList: actrl(isFilterItem),
  userPhraseEnable: isTrue,
  userPhraseTradList: isDic,
  userPhraseSimpList: isDic,
});
