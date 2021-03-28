import { Control, dctrl } from 'data-fixer';
import { PrefMenu } from '../../types/v2';
import { isBoolean } from '../controllers';

const menuGroupSchema = dctrl({
  s2t: isBoolean(true),
  t2s: isBoolean(true),
});

export const menuSchema: Control<PrefMenu> = dctrl({
  enabled: isBoolean(true),
  group: dctrl({
    textarea: menuGroupSchema,
    webpage: menuGroupSchema,
  }),
});
