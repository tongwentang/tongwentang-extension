import browser from 'webextension-polyfill';

export namespace i18n {
  export const getMessage = browser.i18n.getMessage;
}
