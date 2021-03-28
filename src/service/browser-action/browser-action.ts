import browser from 'webextension-polyfill';

export namespace browserAction {
  export const setBadgeText = browser.browserAction.setBadgeText;
  export const setBadgeBackgroundColor = browser.browserAction.setBadgeBackgroundColor;
  export const onClicked = browser.browserAction.onClicked;
}
