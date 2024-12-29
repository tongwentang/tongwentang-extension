import { i18n } from '../service/i18n/i18n';
import { mountBrowserActionListener } from './browser-action';
import { mountCommandListener } from './commands';
import { createBrowserActionMenus } from './menu/browser-action';
import { listenMenusEvent } from './menu/listen';
import { mountRuntimeListener } from './runtime';
import { mountPrefListener } from './state/mount-pref-listener';
import { bgInitialPref } from './state/storage';

mountPrefListener();
mountRuntimeListener();
mountBrowserActionListener();
mountCommandListener();
listenMenusEvent();
createBrowserActionMenus();
bgInitialPref();

console.info(`${i18n.getMessage('MSG_EXT_NAME')} 👌`);
