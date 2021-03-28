# New Tong Wen Tang

New Tong Wen Tang is a Browser Extension that provide functions for convert between Simplicity Chinese and Traditional Chinese.

Main Features:

- Convert
  - Automatic convert on webpage loaded.
  - Responsively convert when content change (for Single Page Application).
  - Manually convert via Browser Action icon and browser context menu.
  - Convert content in clipboard.
- Import and export preferences
  - Support import and export config (including v1 config).
- URL Rule
  - Set the convert rule by url or regular expression.
- Mapping Words
  - Built-in and custom mapping words.

### Todo Features

- Settings sync
- `web-ext run` with chromium [issue](https://github.com/mozilla/web-ext/issues/1862)

### Development

#### Developing with chromium-based browser

Todo start a Chromium-based developing environment you need to paste your chromium binary path into `scripts.we:chromium`, then run `yarn dev:chromium`, because `web-ext` still not yet support for starting chromium-based browser from config.

Replace `/path/to/your/chromiumbinary` to actual path, **and do not commit this change**.

```json
{
  "scripts": {
    "we:chromium": "web-ext --verbose run -s ./dist --config-discovery=false --target=chromium --chromium-binary=/path/to/your/chromiumbinary --start-url=chrome://extensions"
  }
}
```
