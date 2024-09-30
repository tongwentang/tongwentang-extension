import type browser from 'webextension-polyfill';

export const ContextOnAll: browser.Menus.ContextType[] = [
  'page',
  'frame',
  'selection',
  'link',
  'image',
  'video',
  'audio',
];
export const ContextOnEditable: browser.Menus.ContextType[] = ['editable'];
