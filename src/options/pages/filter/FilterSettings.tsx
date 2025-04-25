import type { ChangeEventHandler, FC} from 'react';
import { Fragment, useCallback, useState } from 'react';
import { createFilterRule } from '../../../preference/filter-rule';
import type { PrefFilterRule } from '../../../preference/types/v2';
import { i18n } from '../../../service/i18n/i18n';
import { createNoti } from '../../../service/notification/create-noti';
import { setStorage } from '../../../service/storage/storage';
import { Button, Checkbox, Modal } from '../../components';
import { useFilter } from '../../hooks/filter';
import { useToggle } from '../../hooks/state/use-toggle';
import { FilterRuleEditor } from './FilterRuleEditor';
import { FilterRules } from './FilterRules';

export const FilterSettings: FC = () => {
  const { enabled, setEnable, rules, setRules, chtTags, setChtTags, chsTags, setChsTags } = useFilter();

  const handleEnabledChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    e => { setEnable(e.currentTarget.checked); },
    [setEnable],
  );

  const handleChtChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    e => { setChtTags(e.currentTarget.value.split(',')); },
    [setChtTags],
  );

  const handleChsChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    e => { setChsTags(e.currentTarget.value.split(',')); },
    [setChsTags],
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
      !toEdit.isAdd ? setRules({ type: 'UPDATE', payload: rule }) : setRules({ type: 'ADD', payload: rule });
      off();
    },
    [toEdit, setRules],
  );

  const save = useCallback(
    async () => setStorage({ filter: { enabled, rules, chtTags, chsTags } })
      .then(async () => createNoti(i18n.getMessage('MSG_UPDATE_COMPLETED'))),
    [enabled, rules, chtTags, chsTags],
  );

  return (
    <Fragment>
      <div className="panel">
        <div className="panel-header">
          <div className="columns">
            <div className="column col-auto">
              <label className="form-label">{i18n.getMessage('MSG_LANG_RULE')}</label>
            </div>
            <div className="column col-auto">
              <Button type="primary" onClick={save}>
                {i18n.getMessage('MSG_SAVE')}
              </Button>
            </div>
          </div>
        </div>
        <div className="panel-body">
          <div className="form-group">
            <label className="form-label" htmlFor="l1">{i18n.getMessage('MSG_LANG_CHT')}</label>
            <input
              type="text"
              className="form-input"
              id="l1"
              value={chtTags.toString()}
              onChange={handleChtChange}
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="l2">{i18n.getMessage('MSG_LANG_CHS')}</label>
            <input
              type="text"
              className="form-input"
              id="l2"
              value={chsTags.toString()}
              onChange={handleChsChange}
            />
          </div>
        </div>
        <div className="panel-footer"></div>
      </div>
      <br />
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
        <div className="panel-footer"></div>
      </div>

      <Modal isActive={isModal} onOk={on} onCancel={off}>
        <FilterRuleEditor value={toEdit.rule} onSubmit={handleSubmit} onCancel={off} />
      </Modal>
    </Fragment>
  );
};
