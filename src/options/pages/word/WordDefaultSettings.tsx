import type { ChangeEventHandler, FC } from 'react';
import { Fragment, useCallback } from 'react';
import type { PrefWordDefault } from '../../../preference/types/v2';
import { i18n } from '../../../service/i18n/i18n';
import { Button } from '../../components';
import { Checkbox } from '../../components/forms';

export const WordDefaultSettings: FC<{
  value: PrefWordDefault;
  onChange: (d: PrefWordDefault) => void;
  onSave: () => Promise<unknown>;
}> = ({ value: defWord, onChange: handleChange, onSave: handleSave }) => {
  const upSc: ChangeEventHandler<HTMLInputElement> = useCallback(
    e => {
      ((d, char) => {
        handleChange(((d.s2t = { ...d.s2t, char }), d));
      })({ ...defWord }, e.currentTarget.checked);
    },
    [handleChange, defWord],
  );
  const upSp: ChangeEventHandler<HTMLInputElement> = useCallback(
    e => {
      ((d, phrase) => {
        handleChange(((d.s2t = { ...d.s2t, phrase }), d));
      })({ ...defWord }, e.currentTarget.checked);
    },
    [handleChange, defWord],
  );
  const upTc: ChangeEventHandler<HTMLInputElement> = useCallback(
    e => {
      ((d, char) => {
        handleChange(((d.t2s = { ...d.t2s, char }), d));
      })({ ...defWord }, e.currentTarget.checked);
    },
    [handleChange, defWord],
  );
  const upTp: ChangeEventHandler<HTMLInputElement> = useCallback(
    e => {
      ((d, phrase) => {
        handleChange(((d.t2s = { ...d.t2s, phrase }), d));
      })({ ...defWord }, e.currentTarget.checked);
    },
    [handleChange, defWord],
  );

  return (
    <Fragment>
      <Checkbox
        isSwitch={true}
        label={i18n.getMessage('MSG_DEFAULT_S2T_CHAR')}
        checked={defWord.s2t.char}
        onChange={upSc}
      />
      <Checkbox
        isSwitch={true}
        label={i18n.getMessage('MSG_DEFAULT_S2T_WORD')}
        checked={defWord.s2t.phrase}
        onChange={upSp}
      />
      <Checkbox
        isSwitch={true}
        label={i18n.getMessage('MSG_DEFAULT_T2S_CHAR')}
        checked={defWord.t2s.char}
        onChange={upTc}
      />
      <Checkbox
        isSwitch={true}
        label={i18n.getMessage('MSG_DEFAULT_T2S_WORD')}
        checked={defWord.t2s.phrase}
        onChange={upTp}
      />
      <Button type="primary" onClick={handleSave}>
        {i18n.getMessage('MSG_SAVE')}
      </Button>
    </Fragment>
  );
};
