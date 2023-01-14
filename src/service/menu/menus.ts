import browser, { Menus } from 'webextension-polyfill';

export namespace menus {
  export const create = browser.menus.create;
  export const remove = browser.menus.remove;

  // constant
  export const ContextOnAll: ContextType[] = ['page', 'frame', 'selection', 'link', 'image', 'video', 'audio'];
  export const ContextOnEditable: ContextType[] = ['editable'];

  // types
  export type CreateProperties = Parameters<typeof browser.menus.create>[0];
  export type OnClickData = Menus.OnClickData;
  export type ContextType = Menus.ContextType;
  export type ItemType = Menus.ItemType;
}
