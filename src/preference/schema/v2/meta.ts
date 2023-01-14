import { Control, dctrl, vctrl } from 'data-fixer';
import { z } from 'zod';
import { PrefMeta } from '../../types/v2';
import { vldFn } from '../validator';

export const metaSchema: Control<PrefMeta> = dctrl({
  update: vctrl(vldFn(z.number().int()), Date.now()),
});
