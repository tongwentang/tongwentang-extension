import { actrl, Control, dctrl, vctrl } from 'data-fixer';
import { z } from 'zod';
import { getRandomId } from '../../../utilities';
import { DOMAIN_PATTERN, REGEXP_PATTERN } from '../../filter-rule';
import { FilterTarget, PrefFilter, PrefFilterRule, RegExpMaybe } from '../../types/v2';
import { isBoolean } from '../controllers';
import { vldFn } from '../validator';

const filterRuleSchema: Control<PrefFilterRule> = dctrl({
  id: vctrl(vldFn(z.string().min(10)), getRandomId),
  pattern: vctrl(vldFn(z.union([z.string().regex(DOMAIN_PATTERN), z.string().regex(REGEXP_PATTERN)])), ''),
  target: vctrl<FilterTarget>(vldFn(z.enum(['disabled', 's2t', 't2s'])), 'disabled'),
  regexp: vctrl<RegExpMaybe>(vldFn(z.literal(null).optional()), null),
});

export const filterSchema: Control<PrefFilter> = dctrl({
  enabled: isBoolean(true),
  rules: actrl(filterRuleSchema),
});
