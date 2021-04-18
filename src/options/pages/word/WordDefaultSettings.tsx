import { assocPath, pipe } from 'ramda';
import { FC, Fragment, useCallback } from 'react';
import { PrefWordDefault } from '../../../preference/types/v2';
import { i18n } from '../../../service/i18n/i18n';
import { Button } from '../../components';
import { Checkbox } from '../../components/forms';
import { getEventChecked } from '../../shared/event-value';

const scPath = ['s2t', 'char'];
const spPath = ['s2t', 'phrase'];
const tcPath = ['t2s', 'char'];
const tpPath = ['t2s', 'phrase'];

export const WordDefaultSettings: FC<{
  value: PrefWordDefault;
  onChange: (d: PrefWordDefault) => void;
  onSave: () => Promise<any>;
}> = ({ value: defWord, onChange: handleChange, onSave: handleSave }) => {
  const upWord = useCallback((path: string[]) => (state: boolean) => handleChange(assocPath(path, state, defWord)), [
    defWord,
  ]);

  const upSc = useCallback(pipe(getEventChecked, upWord(scPath)), [upWord]);
  const upSp = useCallback(pipe(getEventChecked, upWord(spPath)), [upWord]);
  const upTc = useCallback(pipe(getEventChecked, upWord(tcPath)), [upWord]);
  const upTp = useCallback(pipe(getEventChecked, upWord(tpPath)), [upWord]);

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
