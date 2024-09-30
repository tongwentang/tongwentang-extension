// @ts-check
const { writeFileSync } = require('fs');
const { resolve } = require('path');
const pkg = require('./package.json');

/** @import { Manifest } from 'webextension-polyfill' */

/**
 * @param {string | undefined} vendor
 * @returns {Manifest.WebExtensionManifest}
 */
const createManifest = vendor => {
  const isFirefox = vendor === 'firefox';
  /** @type {Manifest.WebExtensionManifest['browser_specific_settings']} */
  const browser_specific_settings = isFirefox
    ? { gecko: { id: 'tongwen@softcup', strict_min_version: '63.0' } }
    : undefined;
  /** @type {Manifest.WebExtensionManifest['background']} */
  const background = isFirefox ? { scripts: ['background.js'] } : { service_worker: 'background.js' };

  return {
    manifest_version: 3,
    name: '__MSG_MSG_EXT_NAME__',
    version: pkg.version,
    description: '__MSG_MSG_EXT_DESC__',
    author: 't7yang',
    homepage_url: 'https://github.com/tongwentang/tongwentang-extension',
    default_locale: 'en',
    browser_specific_settings,
    icons: {
      16: 'icons/tongwen-icon-16.png',
      32: 'icons/tongwen-icon-32.png',
      48: 'icons/tongwen-icon-48.png',
      128: 'icons/tongwen-icon-128.png',
    },
    permissions: ['contextMenus', 'downloads', 'notifications', 'storage', 'tabs', 'unlimitedStorage'],
    optional_permissions: ['clipboardWrite', 'clipboardRead'],
    background,
    content_scripts: [
      {
        matches: ['<all_urls>'],
        js: ['content.js'],
        all_frames: true,
        run_at: 'document_idle',
      },
    ],
    action: {
      default_icon: {
        16: 'icons/tongwen-icon-16.png',
        32: 'icons/tongwen-icon-32.png',
        48: 'icons/tongwen-icon-48.png',
        128: 'icons/tongwen-icon-128.png',
      },
    },
    options_ui: {
      browser_style: true,
      open_in_tab: true,
      page: 'options.html',
    },
    commands: {
      w_s2t: {
        description: '__MSG_MSG_WEBPAGE_S2T__',
        suggested_key: {
          default: 'Shift+Alt+C',
        },
      },
      w_t2s: {
        description: '__MSG_MSG_WEBPAGE_T2S__',
        suggested_key: {
          default: 'Shift+Alt+V',
        },
      },
      c_s2t: {
        description: '__MSG_MSG_CONVERT_CLIPBOARD_S2T__',
        suggested_key: {
          default: 'Shift+Alt+Z',
        },
      },
      c_t2s: {
        description: '__MSG_MSG_CONVERT_CLIPBOARD_T2S__',
        suggested_key: {
          default: 'Shift+Alt+X',
        },
      },
    },
  };
};

/**
 * @param {string} vendor
 * @param {string} path
 * @returns {void}
 */
const writeManifest = (vendor, path) => {
  const manifest = createManifest(vendor);
  writeFileSync(resolve(path, 'manifest.json'), JSON.stringify(manifest, null, 2));
};

writeManifest(process.env.vendor || '', process.env.distPath || '');
