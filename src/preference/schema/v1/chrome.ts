import { actrl, Control, dctrl, vctrl } from 'data-fixer';
import { PrefGcV1 } from '../../types/v1';
import { isBoolean, isDic, isString } from '../controllers';
import { vldFn } from '../validator';

const isFilterRule = dctrl({
  url: isString,
  zhflag: vctrl<'none' | 'trad' | 'simp'>(
    vldFn({ type: 'string', required: true, enum: ['none', 'trad', 'simp'] }),
    'none',
  ),
});

export const v1SchemaGc: Control<PrefGcV1> = dctrl({
  version: vctrl<string>(vldFn({ type: 'string', required: true, pattern: '^1..+' }), '1.0.0.0'),
  autoConvert: vctrl<'none' | 'trad' | 'simp'>(
    vldFn({ type: 'string', required: true, enum: ['none', 'trad', 'simp'] }),
    'none',
  ),
  iconAction: vctrl<'auto' | 'trad' | 'simp'>(
    vldFn({ type: 'string', required: true, enum: ['auto', 'trad', 'simp'] }),
    'auto',
  ),
  symConvert: isBoolean(false),
  inputConvert: vctrl<'none' | 'auto' | 'trad' | 'simp'>(
    vldFn({ type: 'string', required: true, enum: ['none', 'auto', 'trad', 'simp'] }),
    'none',
  ),
  fontCustom: dctrl({ enable: isBoolean(false), trad: isString, simp: isString }),
  urlFilter: dctrl({ enable: isBoolean(false), list: actrl(isFilterRule) }),
  userPhrase: dctrl({ enable: isBoolean(true), trad: isDic, simp: isDic }),
  contextMenu: dctrl({ enable: isBoolean(true) }),
});
