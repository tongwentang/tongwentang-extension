import type { FC, RefObject, SyntheticEvent} from 'react';
import { useCallback, useRef } from 'react';
import { i18n } from '../../../service/i18n/i18n';
import { exportPref } from '../../../service/storage/export-pref';
import { importPref } from '../../../service/storage/import-pref';
import { confirmResetPref, confirmResetPrefKeep } from '../../../service/storage/reset-pref';
import { BROWSER_TYPE } from '../../../service/types';
import { Button } from '../../components';

const onload = (event: ProgressEvent<FileReader>) => {
  importPref(BROWSER_TYPE, event.target!.result! as string);
};

export const Preferences: FC = () => {
  const ref = useRef<HTMLInputElement>();

  const showDialog = useCallback(() => ref.current?.click(), [ref.current]);

  const handleLoad = useCallback((_: SyntheticEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    reader.onload = onload;
    reader.readAsText(ref.current!.files![0]);
  }, []);

  return (
    <div className="container">
      <div className="columns">
        <div className="column">
          <input
            type="file"
            style={{ display: 'none' }}
            accept=".json"
            // TODO: remove type assertion after react fix type
            ref={ref as RefObject<HTMLInputElement>}
            onChange={handleLoad}
          />
          <Button type="primary" onClick={showDialog}>
            {i18n.getMessage('MSG_IMPORT')} <i className="icon icon-upload" />
          </Button>
        </div>
        <div className="column">
          <Button type="primary" onClick={exportPref}>
            {i18n.getMessage('MSG_EXPORT')} <i className="icon icon-download" />
          </Button>
        </div>
        <div className="column">
          <Button type="error" onClick={confirmResetPrefKeep} tooltip={i18n.getMessage('MSG_RESET_TIP')}>
            {i18n.getMessage('MSG_RESET')} <i className="icon icon-delete" />
          </Button>
        </div>
        <div className="column">
          <Button type="error" onClick={confirmResetPref} tooltip={i18n.getMessage('MSG_RESET_ALL_TIP')}>
            {i18n.getMessage('MSG_RESET_ALL')} <i className="icon icon-cross" />
          </Button>
        </div>
      </div>
    </div>
  );
};
