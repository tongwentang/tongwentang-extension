import type { Control} from 'data-fixer';
import { dctrl, vctrl } from 'data-fixer';
import { z } from 'zod';
import type { Pref } from '../../types/lastest';
import { vldFn } from '../validator';
import { filterSchema } from './filter';
import { generalSchema } from './general';
import { menuSchema } from './menu';
import { metaSchema } from './meta';
import { wordSchema } from './word';

export const v2Schema: Control<Pref> = dctrl({
  version: vctrl<2>(vldFn(z.literal(2)), 2),
  meta: metaSchema,
  general: generalSchema,
  menu: menuSchema,
  filter: filterSchema,
  word: wordSchema,
});
