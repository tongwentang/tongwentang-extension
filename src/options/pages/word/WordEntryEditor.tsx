import { FC, useCallback, useEffect, useState } from 'react';
import { i18n } from '../../../service/i18n/i18n';
import { Button } from '../../components';
import { EventCallback } from '../types';

export const WordEntryEditor: FC<{
  entry: [string, string];
  onSubmit: EventCallback<[[string, string]]>;
}> = ({ entry, onSubmit }) => {
  const [key, setKey] = useState('');
  const [value, setValue] = useState('');

  useEffect(() => void (setKey(entry[0]), setValue(entry[1])), [entry]);

  const submit = useCallback(() => void (onSubmit([key, value]), setKey(''), setValue('')), [onSubmit, key, value]);

  return (
    <div className="columns">
      <div className="column col-4">
        <div className="form-group">
          <label className="form-label">Convert Target</label>
          <input className="form-input" type="text" value={key} onChange={evt => setKey(evt.target.value)} />
        </div>
      </div>
      <div className="column col-4">
        <div className="form-group">
          <label className="form-label">Convert Value</label>
          <input className="form-input" type="text" value={value} onChange={evt => setValue(evt.target.value)} />
        </div>
      </div>
      <div className="column col-4">
        <div className="form-group">
          <label className="form-label">
            <span className="d-invisible">button</span>
          </label>
          <Button onClick={submit}>{i18n.getMessage('MSG_OK')}</Button>
        </div>
      </div>
    </div>
  );
};
