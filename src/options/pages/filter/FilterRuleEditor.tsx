import { assoc } from 'ramda';
import { ChangeEvent, FC, useCallback, useEffect, useState } from 'react';
import { isPatternValid } from '../../../preference/filter-rule';
import { FilterTarget, PrefFilterRule } from '../../../preference/types/v2';
import { i18n } from '../../../service/i18n/i18n';
import { Button, Select } from '../../components';
import { FilterRuleTargetOptions } from '../../hooks/filter/options';

export const FilterRuleEditor: FC<{
  value: PrefFilterRule;
  onSubmit: (rule: PrefFilterRule) => void;
  onCancel: () => void;
}> = ({ value: org, onSubmit: handleSubmit, onCancel: handleCancel }) => {
  const [rule, setRule] = useState({ ...org });

  useEffect(() => void setRule({ ...org }), [org]);

  const [isError, setError] = useState(false);

  const updatePattern = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setRule(assoc('pattern', e.currentTarget.value)),
    [],
  );

  const updateTarget = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => setRule(assoc('target', e.currentTarget.value as FilterTarget)),
    [],
  );

  const submit = useCallback(() => !isError && handleSubmit(rule), [rule, isError]);

  useEffect(() => void setError(!isPatternValid(rule.pattern)), [rule.pattern]);

  return (
    <div className="columns">
      <div className="column">
        <div className="form-group">
          <label className="form-label">{i18n.getMessage('MSG_URL_REGEX')}</label>
          <input
            type="text"
            className={`form-input ${isError ? 'is-error' : ''}`}
            value={rule.pattern}
            onChange={updatePattern}
          />
        </div>
      </div>
      <div className="column">
        <Select id="RuleTarget" label={i18n.getMessage('MSG_TARGET')} value={rule.target} onChange={updateTarget}>
          {FilterRuleTargetOptions()}
        </Select>
      </div>
      <div className="column">
        <div className="form-group">
          <label className="form-label">{i18n.getMessage('MSG_OK')}</label>
          <Button type="primary" onClick={submit}>
            {i18n.getMessage('MSG_OK')}
          </Button>
        </div>
      </div>
      <div className="column">
        <div className="form-group">
          <label className="form-label">{i18n.getMessage('MSG_CANCEL')}</label>
          <Button type="primary" onClick={handleCancel}>
            {i18n.getMessage('MSG_CANCEL')}
          </Button>
        </div>
      </div>
    </div>
  );
};
