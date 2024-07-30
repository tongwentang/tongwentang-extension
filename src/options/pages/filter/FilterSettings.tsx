import { ChangeEventHandler, FC, Fragment, useCallback, useState } from 'react';
import { createFilterRule } from '../../../preference/filter-rule';
import { PrefFilterRule } from '../../../preference/types/v2';
import { i18n } from '../../../service/i18n/i18n';
import { createNoti } from '../../../service/notification/create-noti';
import { setStorage } from '../../../service/storage/storage';
import { Button, Checkbox, Modal } from '../../components';
import { useFilter } from '../../hooks/filter';
import { useToggle } from '../../hooks/state/use-toggle';
import { FilterRuleEditor } from './FilterRuleEditor';
import { FilterRules } from './FilterRules';

export const FilterSettings: FC = () => {
  const { enabled, setEnable, rules, setRules } = useFilter();

  const handleEnabledChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    e => setEnable(e.currentTarget.checked),
    [setEnable],
  );

  const [isModal, { on, off }] = useToggle(false);

  const [toEdit, setToEdit] = useState<{ isAdd: boolean; rule: PrefFilterRule }>({
    isAdd: true,
    rule: createFilterRule(),
  });

  const handleAdd = useCallback(() => {
    setToEdit({ isAdd: true, rule: createFilterRule() });
    on();
  }, [setToEdit, on]);

  const handleUpdate = useCallback(
    (rule: PrefFilterRule) => {
      setToEdit({ isAdd: false, rule });
      on();
    },
    [setToEdit, on],
  );

  const handleSubmit = useCallback(
    (rule: PrefFilterRule) => {
      toEdit.isAdd === false ? setRules({ type: 'UPDATE', payload: rule }) : setRules({ type: 'ADD', payload: rule });
      off();
    },
    [toEdit, setRules],
  );

  const save = useCallback(
    () => setStorage({ filter: { enabled, rules } }).then(() => createNoti(i18n.getMessage('MSG_UPDATE_COMPLETED'))),
    [enabled, rules],
  );

  return (
    <Fragment>
      <div className="panel">
        <div className="panel-nav" style={{ padding: '1em' }}>
          <div className="columns">
            <div className="column col-auto">
              <Checkbox
                isSwitch={true}
                label={i18n.getMessage('MSG_ENABLE_DOMAIN_RULE')}
                checked={enabled}
                onChange={handleEnabledChange}
              />
            </div>
            <div className="column col-auto">
              <Button type="primary" onClick={handleAdd}>
                {i18n.getMessage('MSG_ADD')}
              </Button>
            </div>
            <div className="column col-auto">
              <Button type="primary" onClick={save}>
                {i18n.getMessage('MSG_SAVE')}
              </Button>
            </div>
          </div>
        </div>

        <div className="panel-body" style={{ maxHeight: '60vh' }}>
          <FilterRules rules={rules} setRules={setRules} onUpdate={handleUpdate} />
        </div>
      </div>

      <Modal isActive={isModal} onOk={on} onCancel={off}>
        <FilterRuleEditor value={toEdit.rule} onSubmit={handleSubmit} onCancel={off} />
      </Modal>
    </Fragment>
  );
};
