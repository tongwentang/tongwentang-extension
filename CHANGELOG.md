# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [2.1.6](https://github.com/tongwentang/tongwentang-extension/compare/2.1.5...2.1.6) (2022-08-27)

### Bug Fixes

- avoid to update node content if the converted content is same as original ([36270a0](https://github.com/tongwentang/tongwentang-extension/commit/36270a00a4d6f5992b555a1353ac3827667c550d)), closes [#39](https://github.com/tongwentang/tongwentang-extension/issues/39)

### [2.1.5](https://github.com/tongwentang/tongwentang-extension/compare/2.1.4...2.1.5) (2022-08-21)

### Bug Fixes

- fix types errors ([c9ff4f4](https://github.com/tongwentang/tongwentang-extension/commit/c9ff4f4e89557cc0cd83decb90e71702495dda0a))

## [2.1.4](https://github.com/tongwentang/tongwentang-extension/compare/2.1.3...2.1.4) (2021-05-29)

### Bug Fixes

- custom t2s mapping words do not merge into converter. ([96bff08](https://github.com/tongwentang/tongwentang-extension/commit/96bff081e95d05098cc39e506118b795e929fb1c)), closes [#33](https://github.com/tongwentang/tongwentang-extension/issues/33)

## [2.1.3] - 2021-04-28

### Fixed

- Cursor jump to line start in input area. (#31)
- Can not save with "detective simplified to Traditional" as auto convert option. (#22 #30)

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
