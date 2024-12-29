import type { FC } from 'react';
import { i18n } from '../../../service/i18n/i18n';
import { Divider, Page } from '../../components';
import { GeneralSettings } from './GeneralSettings';
import { Preferences } from './Preferences';

export const GeneralPage: FC = () => {
  return (
    <Page title={i18n.getMessage('MSG_GENERAL')}>
      <GeneralSettings />

      <Divider content={i18n.getMessage('MSG_MAINTAIN_PREF')} />

      <Preferences />
    </Page>
  );
};
