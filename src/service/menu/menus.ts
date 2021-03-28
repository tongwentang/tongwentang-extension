import browser from 'webextension-polyfill';

export namespace menus {
  export const create = browser.contextMenus.create;
  export const remove = browser.contextMenus.remove;

  // constant
  export const ContextOnAll: menus.ContextType[] = ['page', 'frame', 'selection', 'link', 'image', 'video', 'audio'];
  export const ContextOnEditable: menus.ContextType[] = ['editable'];

  // types
  export type CreateProperties = Parameters<typeof browser.contextMenus.create>[0];
  export type OnClickData = browser.contextMenus.OnClickData;
  export type ContextType = browser.contextMenus.ContextType;
  export type ItemType = browser.contextMenus.ItemType;
}
