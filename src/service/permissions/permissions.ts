import browser from 'webextension-polyfill';

export namespace permissions {
  export const request = browser.permissions.request;
}
