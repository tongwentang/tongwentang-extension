import type { Control} from 'data-fixer';
import { dctrl, rctrl } from 'data-fixer';
import type { PrefWord } from '../../types/v2';
import { isBoolean, isString } from '../controllers';

export const wordSchema: Control<PrefWord> = dctrl({
  default: dctrl({
    s2t: dctrl({
      char: isBoolean(true),
      phrase: isBoolean(true),
    }),
    t2s: dctrl({
      char: isBoolean(true),
      phrase: isBoolean(true),
    }),
  }),
  custom: dctrl({
    s2t: rctrl(isString),
    t2s: rctrl(isString),
  }),
});
