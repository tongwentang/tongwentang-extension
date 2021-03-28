import { Control, dctrl, vctrl } from 'data-fixer';
import { Pref } from '../../types/lastest';
import { vldFn } from '../validator';
import { filterSchema } from './filter';
import { generalSchema } from './general';
import { menuSchema } from './menu';
import { metaSchema } from './meta';
import { wordSchema } from './word';

export const v2Schema: Control<Pref> = dctrl({
  version: vctrl<2>(vldFn({ type: 'number', required: true, enum: [2] }), 2),
  meta: metaSchema,
  general: generalSchema,
  menu: menuSchema,
  filter: filterSchema,
  word: wordSchema,
});
