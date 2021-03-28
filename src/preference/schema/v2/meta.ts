import { Control, dctrl, vctrl } from 'data-fixer';
import { PrefMeta } from '../../types/v2';
import { vldFn } from '../validator';

export const metaSchema: Control<PrefMeta> = dctrl({
  update: vctrl(vldFn({ type: 'integer', required: true }), Date.now()),
});
