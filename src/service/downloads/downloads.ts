import browser from 'webextension-polyfill';

export namespace downloads {
  export const download = browser.downloads.download;
}
