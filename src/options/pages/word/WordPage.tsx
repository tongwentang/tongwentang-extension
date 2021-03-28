import { FC } from 'react';
import { i18n } from '../../../service/i18n/i18n';
import { Page } from '../../components';
import { WordSettings } from './WordSettings';

export const WordPage: FC = () => {
  return (
    <Page title={i18n.getMessage('MSG_WORD')}>
      <WordSettings />
    </Page>
  );
};
