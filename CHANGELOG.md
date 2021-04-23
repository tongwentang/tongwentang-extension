# TongWenTang Extension

Check [Keep a Changelog](http://keepachangelog.com/) for recommendations on how to structure this file.

## [2.1.2] - 2021-04-24

### Fixed

- Grant permission for clipboard failed message now show properly.
- Switching default word now work properly (#23).
- Cursor now do not jump to line start when typing on input area (#10).
- All relating punctuations now collect and send to converter (#11).
- Prevent detect language API failed (#12).
- v1 preference for Google Chromium is now handle properly on importing (#15).

## [2.1.1] - 2021-04-11

### Changed

- Remove `activeTab` permission due no using.

### Fixed

- Remove trailing bracket in context menu.

## [2.1.0] - 2021-04-01

### Changed

- Change default shortcut due to Chrome disallow combination of `ctrl` and `alt`.
- Update i18n messages.

### Fixed

- Replace plain text in UI by i18n messages.

## [2.0.0] - 2021-03-28

Compare to v[1.5.1](https://github.com/tongwentang/New-Tongwentang-for-Firefox/releases/tag/1.5)

### Added

- New [convert core](https://github.com/tongwentang/tongwen-core) with completely new algorithm, convert speed is significantly increase 🚀.
- New settings page UI design.
- Import preferences is now checking with schema, provide an option to fix imported preferences if broken.
- Reset preference is now support `Reset` and `Reset All`, latter wipe out everthing including custom mapping words.
- New Detective Auto Convert Mode which detect page content first, do nothing if page content not Chinese.
- New Default Convert Target, if page content is unknown, then extension will convert to default target.
- New Dynamic Mode which reponsively convert on page content changed (SPA web page is now supported).
- New Debug Mode which logging infomation to debug console.
- Domain rule is now support both plain text and regular expression.
- New BrowserAction Context Menu, including direct set domain rule and emit clipboard convert.

### Changed

- Clipboard convert menu is moved to browser action (icon) context menu.
- Clipboard permissions is now optional.
