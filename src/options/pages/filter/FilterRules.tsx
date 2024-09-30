import type { Dispatch, FC} from 'react';
import { useCallback } from 'react';
import type { PrefFilterRule } from '../../../preference/types/v2';
import { i18n } from '../../../service/i18n/i18n';
import type { UseFilterRuleAction } from '../../hooks/filter';
import { FilterRuleRow } from './FilterRuleRow';

export const FilterRules: FC<{
  rules: PrefFilterRule[];
  setRules: Dispatch<UseFilterRuleAction>;
  onUpdate: (rule: PrefFilterRule) => void;
}> = ({ rules, setRules, onUpdate: handleUpdate }) => {
  const handleUp = useCallback((index: number) => { setRules({ type: 'UP', payload: index }); }, [setRules]);

  const handleDown = useCallback((index: number) => { setRules({ type: 'DOWN', payload: index }); }, [setRules]);

  const handleRemove = useCallback((rule: PrefFilterRule) => { setRules({ type: 'DELETE', payload: rule }); }, [setRules]);

  return (
    <table className="table table-striped table-hover">
      <thead>
        <tr>
          <th>#</th>
          <th>{i18n.getMessage('MSG_URL_REGEX')}</th>
          <th>{i18n.getMessage('MSG_TARGET')}</th>
          <th />
          <th />
          <th />
          <th />
        </tr>
      </thead>
      <tbody>
        {rules.map((rule, index) => (
          <FilterRuleRow
            key={rule.id}
            rule={rule}
            index={index}
            length={rules.length}
            onChange={handleUpdate}
            onRemove={handleRemove}
            onUp={handleUp}
            onDown={handleDown}
          />
        ))}
      </tbody>
    </table>
  );
};
