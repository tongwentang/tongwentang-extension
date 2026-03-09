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

### Download

- [Firefox](https://addons.mozilla.org/firefox/addon/new_tongwentang/)
- [Chrome](https://chrome.google.com/webstore/detail/new-tongwentang/ldmgbgaoglmaiblpnphffibpbfchjaeg)
- [Microsoft Edge](https://microsoftedge.microsoft.com/addons/detail/%E6%96%B0%E5%90%8C%E6%96%87%E5%A0%82/ijddgmclgedepadbikmfekambhhfjfnl)

### Todo Features

- Settings sync.

### Development

To start developing, first git clone then install dependencies:

```
$ yarn install
```

#### Developing with Firefox

Run command:

```
$ yarn dev:firefox
```

#### Developing with chromium-based browser

To start a Chromium-based developing environment you need to create a `.env` file from `env.sample` then paste your chromium binary path to `CHROMIUM_BINARY`. ([issue](https://github.com/mozilla/web-ext/issues/1862))

Run command:

```
$ yarn dev:chromium
```

#### Developing with Safari

Build a Safari-compatible extension bundle:

```
$ npm run build:safari
```

Generate or refresh the Xcode project:

```
$ npm run safari:convert
```

The converter defaults to:

- app name: `TongWenTang Safari`
- bundle identifier: `io.github.tongwentang.safari`
- project location: `./safari`

You can override them when needed:

```
$ SAFARI_APP_NAME="TongWenTang Safari" \
  SAFARI_BUNDLE_ID="io.github.tongwentang.safari" \
  SAFARI_PROJECT_LOCATION="safari" \
  npm run safari:convert
```

The generated `safari/` directory is a local build artifact and should not be committed.

Then open `safari/TongWenTang Safari/TongWenTang Safari.xcodeproj` in Xcode and run the macOS app target once to install the extension into Safari.
