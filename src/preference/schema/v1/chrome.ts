import type { Control} from 'data-fixer';
import { actrl, dctrl, vctrl } from 'data-fixer';
import { z } from 'zod';
import type { PrefGcV1 } from '../../types/v1';
import { isBoolean, isDic, isString } from '../controllers';
import { vldFn } from '../validator';

const isFilterRule = dctrl({
  url: isString,
  zhflag: vctrl<'none' | 'trad' | 'simp'>(vldFn(z.enum(['none', 'trad', 'simp'])), 'none'),
});

export const v1SchemaGc: Control<PrefGcV1> = dctrl({
  version: vctrl<string>(vldFn(z.string().regex(/^1..+/)), '1.0.0.0'),
  autoConvert: vctrl<'none' | 'trad' | 'simp'>(vldFn(z.enum(['none', 'trad', 'simp'])), 'none'),
  iconAction: vctrl<'auto' | 'trad' | 'simp'>(vldFn(z.enum(['auto', 'trad', 'simp'])), 'auto'),
  symConvert: isBoolean(false),
  inputConvert: vctrl<'none' | 'auto' | 'trad' | 'simp'>(vldFn(z.enum(['none', 'auto', 'trad', 'simp'])), 'none'),
  fontCustom: dctrl({ enable: isBoolean(false), trad: isString, simp: isString }),
  urlFilter: dctrl({ enable: isBoolean(false), list: actrl(isFilterRule) }),
  userPhrase: dctrl({ enable: isBoolean(true), trad: isDic, simp: isDic }),
  contextMenu: dctrl({ enable: isBoolean(true) }),
});
