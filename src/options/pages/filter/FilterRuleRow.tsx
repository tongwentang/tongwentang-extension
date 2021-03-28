import { FC, useCallback } from 'react';
import { PrefFilterRule } from '../../../preference/types/v2';
import { i18n } from '../../../service/i18n/i18n';
import { Button } from '../../components';

export const FilterRuleRow: FC<{
  index: number;
  rule: PrefFilterRule;
  length: number;
  onChange: (rule: PrefFilterRule) => void;
  onRemove: (rule: PrefFilterRule) => void;
  onUp: (index: number) => void;
  onDown: (index: number) => void;
}> = ({ index, rule, length, onChange: handleChange, onRemove: handleRemove, onUp: handleUp, onDown: handleDown }) => {
  const change = useCallback(() => handleChange(rule), [rule]);
  const remove = useCallback(() => handleRemove(rule), [rule]);
  const up = useCallback(() => handleUp(index), [handleUp]);
  const down = useCallback(() => handleDown(index), [handleDown]);

  return (
    <tr>
      <td>{index + 1}</td>
      <td>{rule.pattern}</td>
      <td>{i18n.getMessage(`MSG_${rule.target}`)}</td>
      <td>
        <Button disabled={index === 0} onClick={up}>
          {i18n.getMessage('MSG_MOVE_UP')}
        </Button>
      </td>
      <td>
        <Button disabled={!(index < length - 1)} onClick={down}>
          {i18n.getMessage('MSG_MOVE_DOWN')}
        </Button>
      </td>
      <td>
        <Button type="primary" onClick={change}>
          {i18n.getMessage('MSG_EDIT')}
        </Button>
      </td>
      <td>
        <Button type="error" onClick={remove}>
          {i18n.getMessage('MSG_DELETE')}
        </Button>
      </td>
    </tr>
  );
};
