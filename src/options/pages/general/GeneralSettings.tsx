import { FC } from 'react';
import { i18n } from '../../../service/i18n/i18n';
import { Checkbox, Select } from '../../components';
import { autoConvertOptions, browserActionOptions, defaultTargetOptions } from '../../hooks/general/options';
import { useGeneralOpt } from '../../hooks/general/use-general-opt';

export const GeneralSettings: FC = () => {
  const { general, setAutoConvert, setBrowserAction, setDefaultTarget, setSpaMode, setDebugMode } = useGeneralOpt();

  return (
    <form>
      <Select
        id="AutoConvert"
        label={i18n.getMessage('MSG_AUTO_CONVERT')}
        value={general.autoConvert}
        onChange={setAutoConvert}
      >
        {autoConvertOptions()}
      </Select>
      <Select
        id="BrowserAction"
        label={i18n.getMessage('MSG_BROWSER_ACTION')}
        value={general.browserAction}
        onChange={setBrowserAction}
      >
        {browserActionOptions()}
      </Select>
      <Select
        id="DefaultLanguage"
        label={i18n.getMessage('MSG_DEFAULT_CONVERT')}
        value={general.defaultTarget}
        onChange={setDefaultTarget}
      >
        {defaultTargetOptions()}
      </Select>
      <Checkbox
        isSwitch={true}
        label={i18n.getMessage('MSG_DYNAMIC_CONVERT')}
        checked={general.spaMode}
        onChange={setSpaMode}
      />
      <Checkbox
        isSwitch={true}
        label={i18n.getMessage('MSG_DEBUG_MODE')}
        checked={general.debugMode}
        onChange={setDebugMode}
      />
    </form>
  );
};
