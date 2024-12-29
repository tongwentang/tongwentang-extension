import type { FC} from 'react';
import { Fragment } from 'react';
import { i18n } from '../../../service/i18n/i18n';
import { Checkbox } from '../../components/forms';
import { useMenu } from '../../hooks/menu';

export const MenuSettings: FC = () => {
  const { menu, setMenuEnable, setWebS2t, setWebT2s, setTextS2t, setTextT2s } = useMenu();

  return (
    <Fragment>
      <Checkbox
        isSwitch={true}
        label={i18n.getMessage('MSG_ENABLE_MENU')}
        checked={menu.enabled}
        onChange={setMenuEnable}
      />
      <Checkbox
        isSwitch={true}
        label={i18n.getMessage('MSG_WEBPAGE_S2T')}
        checked={menu.group.webpage.s2t}
        onChange={setWebS2t}
      />
      <Checkbox
        isSwitch={true}
        label={i18n.getMessage('MSG_WEBPAGE_T2S')}
        checked={menu.group.webpage.t2s}
        onChange={setWebT2s}
      />
      <Checkbox
        isSwitch={true}
        label={i18n.getMessage('MSG_TEXTAREA_S2T')}
        checked={menu.group.textarea.s2t}
        onChange={setTextS2t}
      />
      <Checkbox
        isSwitch={true}
        label={i18n.getMessage('MSG_TEXTAREA_T2S')}
        checked={menu.group.textarea.t2s}
        onChange={setTextT2s}
      />
    </Fragment>
  );
};
