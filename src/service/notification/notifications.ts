import browser from 'webextension-polyfill';

export namespace notifications {
  export const clear = browser.notifications.clear;
  export const create = browser.notifications.create;
}
