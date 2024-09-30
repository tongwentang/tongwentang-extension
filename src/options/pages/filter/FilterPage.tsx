import type { FC } from 'react';
import { i18n } from '../../../service/i18n/i18n';
import { Page } from '../../components';
import { FilterSettings } from './FilterSettings';

export const FilterPage: FC = () => {
  return (
    <Page title={i18n.getMessage('MSG_DOMAIN_RULE')}>
      <FilterSettings />
    </Page>
  );
};
