import { actrl, Control, dctrl, vctrl } from 'data-fixer';
import { getRandomId } from '../../../utilities';
import { DOMAIN_PATTERN, REGEXP_PATTERN } from '../../filter-rule';
import { FilterTarget, PrefFilter, PrefFilterRule, RegExpMaybe } from '../../types/v2';
import { isBoolean } from '../controllers';
import { vldFn } from '../validator';

const filterRuleSchema: Control<PrefFilterRule> = dctrl({
  id: vctrl(vldFn({ type: 'string', required: true }), getRandomId),
  pattern: vctrl(
    vldFn({
      type: 'string',
      required: true,
      oneOf: [
        // TODO: fix: regex.toString() need to add a prefix for \
        { type: 'string', pattern: DOMAIN_PATTERN.toString().slice(1, -1) },
        { type: 'string', pattern: REGEXP_PATTERN.toString().slice(1, -1) },
      ],
    }),
    '',
  ),
  target: vctrl<FilterTarget>(vldFn({ type: 'string', required: true, enum: ['disabled', 's2t', 't2s'] }), 'disabled'),
  regexp: vctrl<RegExpMaybe>(vldFn({ type: 'null', required: false }), null),
});

export const filterSchema: Control<PrefFilter> = dctrl({
  enabled: isBoolean(true),
  rules: actrl(filterRuleSchema),
});
