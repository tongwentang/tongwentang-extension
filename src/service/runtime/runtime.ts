import browser from 'webextension-polyfill';

export namespace runtime {
  export const openOptionsPage = browser.runtime.openOptionsPage;
  export const onMessage = browser.runtime.onMessage;
  export const sendMessage = browser.runtime.sendMessage;

  // types
  export type MessageSender = browser.runtime.MessageSender;
}
