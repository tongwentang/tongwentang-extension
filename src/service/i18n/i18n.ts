import browser from 'webextension-polyfill';

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace i18n {
  export const { getMessage } = browser.i18n;
}
