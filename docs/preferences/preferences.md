# New TongWenTang Preferences

There are many settings for customization in preferences page.

## General

Auto Convert

- Disabled
  - Do nothing on page loaded.
- Simplified to Traditional:
  - Convert to Traditional Chinese on page loaded.
- Traditional to Simplified:
  - Convert to Simplified Chinese on page loaded.
- Detective Simplified to Traditional:
  - Convert to Traditional Chinese on page loaded if the web page content regconize as Simplified Chinese.
- Detective Traditional to Simplified:
  - Convert to Simplified Chinese on page loaded if the web page content regconize as Traditional Chinese.

Icon Action

- Auto:
  - Switch page content between Traditional Chinese and Simplified Chinese.
  - If the web page content can not regconize by browser API, then extension will convert to default on first time click.
- Traditional Chinese
  - Convert to Traditional Chinese each time icon clicked.
- Simplified Chinese
  - Convert to Simplified Chinese each time icon clicked.

Default Convert

- If icon action set to "Auto" and web page content can not regconize then fallback to this value.

Dynamic Convert

- Responsively convert web page content on changed, many website partially update content without refresh whole web page.

Debug Mode

- If enabled, some critical information will log into extension console.
- How to open extension console
  - Firefox:
    - Goto `about:debugging`, switch to `This Firefox` tab, find `New TongWenTang` and click `Inspect`, switch to `console` tab.
  - Chrome:
    - Goto `chrome://extensions`, find `New TongWenTang` and click `Detail`, click `background page` link under `Inspect Views`.

## Context Menu

Enabled Context Menu

- Completely disabled or enabled showing commands on web page context menu.

Others

- Disabled or enabled for each commands showing on web page context menu.

## Domain Rule

Enabled Domain Rule

- Completely enabled or disabled this feature.

Add

- Trigger Domain Rule editor.

Save

- In order to persist all changes made, manually click "Save" button is required.

Domain Rule

- Domain Rule can be plain text or regular expression.
- Plain text mean any url that contain this text will trigger convert action.
- Regular expression mean `regexp.test` function call with URL must return `true` in order to trigger convert action.

## Word

Default

- There are four built-in mapping list which can turn on and off.

Custom Simplified to Traditional / Custom Traditional to Simplified

- Add, edit, or remove user custom mapping list.
