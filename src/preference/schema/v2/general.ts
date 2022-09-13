import { Control, dctrl, vctrl } from 'data-fixer';
import { LangType } from 'tongwen-core';
import { AutoConvertOpt, BrowserActionOpt, PrefGeneral } from '../../types/v2';
import { isBoolean } from '../controllers';
import { vldFn } from '../validator';

export const generalSchema: Control<PrefGeneral> = dctrl({
  autoConvert: vctrl<AutoConvertOpt>(
    vldFn({
      type: 'string',
      required: true,
      enum: ['disabled', LangType.s2t, LangType.t2s, 'ds2t', 'dt2s'],
    }),
    'disabled',
  ),
  browserAction: vctrl<BrowserActionOpt>(
    vldFn({ type: 'string', required: true, enum: ['auto', LangType.s2t, LangType.t2s] }),
    'auto',
  ),
  defaultTarget: vctrl(vldFn({ type: 'string', required: true, enum: [LangType.s2t, LangType.t2s] }), LangType.s2t),
  spaMode: isBoolean(true),
  updateLang: isBoolean(false),
  debugMode: isBoolean(false),
});
