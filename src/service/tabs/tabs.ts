import browser from 'webextension-polyfill';

export namespace tabs {
  export const sendMessage = browser.tabs.sendMessage;
  export const detectLanguage = browser.tabs.detectLanguage;
  export const query = browser.tabs.query;
  export const get = browser.tabs.get;

  // types
  export type Tab = browser.tabs.Tab;
}
