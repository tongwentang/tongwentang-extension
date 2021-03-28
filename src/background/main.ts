import { setBadge } from '../service/browser-action/set-badge';
import { i18n } from '../service/i18n/i18n';
import { createMenu } from '../service/menu/create-menu';
import { mountBrowserActionListener } from './browser-action';
import { mountCommandListener } from './commands';
import { createBrowserActionMenus } from './menu';
import { mountRuntimeListener } from './runtime';
import { BgState, createBgState, mountPrefListener } from './state';

(async function main() {
  const state: BgState = await createBgState();

  mountPrefListener(state);
  mountRuntimeListener(state);
  mountBrowserActionListener(state);
  mountCommandListener(state);

  await Promise.all([createMenu(state), createBrowserActionMenus(state), setBadge(state.pref)]);

  console.info(`${i18n.getMessage('MSG_EXT_NAME')} 👌`);
})().catch(console.error);
