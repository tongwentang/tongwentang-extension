import { config, env } from './web-ext-config.mjs';

export default {
  ...config,
  sourceDir: './dist/chromium',
  run: {
    target: ['chromium'],
    chromiumBinary: env.CHROMIUM_BINARY || undefined,
    startUrl: ['chrome://extensions'],
  },
};
