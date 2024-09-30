import type { FC } from 'react';
import { i18n } from '../../../service/i18n/i18n';
import { Card, CardBody, CardFooter, CardHeader, Page } from '../../components';

export const AboutPage: FC = () => {
  return (
    <Page title={i18n.getMessage('MSG_ABOUT')}>
      <Card>
        <CardHeader title={i18n.getMessage('MSG_EXT_NAME')} />

        <CardBody>
          <p>
            {i18n.getMessage('MSG_REPOSITORY')}
            <a href="https://github.com/tongwentang/tongwentang-extension" target="_blank" rel="noreferrer">
              <i className="icon icon-link" />
            </a>
          </p>
          <p>
            {i18n.getMessage('MSG_ISSUE_REPORT')}
            <a href="https://github.com/tongwentang/tongwentang-extension/issues" target="_blank" rel="noreferrer">
              <i className="icon icon-link" />
            </a>
          </p>
          <p>
            {i18n.getMessage('MSG_CHANGELOG')}
            <a
              href="https://github.com/tongwentang/tongwentang-extension/blob/master/CHANGELOG.md"
              target="_blank"
              rel="noreferrer"
            >
              <i className="icon icon-link" />
            </a>
          </p>
          <p>
            {i18n.getMessage('MSG_CONTRIBUTORS')}
            <a
              href="https://github.com/tongwentang/tongwentang-extension/graphs/contributors"
              target="_blank"
              rel="noreferrer"
            >
              <i className="icon icon-link" />
            </a>
          </p>
          <p>
            {i18n.getMessage('MSG_LICENSE')}
            <a
              href="https://github.com/tongwentang/tongwentang-extension/blob/master/LICENSE"
              target="_blank"
              rel="noreferrer"
            >
              <i className="icon icon-link" />
            </a>
          </p>
        </CardBody>
        <CardFooter />
      </Card>
    </Page>
  );
};
