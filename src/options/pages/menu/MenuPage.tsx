import type { FC } from 'react';
import { i18n } from '../../../service/i18n/i18n';
import { Page } from '../../components';
import { MenuSettings } from './MenuSettings';

export const MenuPage: FC = () => {
  return (
    <Page title={i18n.getMessage('MSG_MENU')}>
      <MenuSettings />
    </Page>
  );
};
