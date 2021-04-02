# Permessions Required for New TongWenTang Extension

The Extension require several permissions inorder to work well.

### Required Permissions

- `activeTab`
  - Convert current web page from browser action.
  - Convert clipboard content by keyboard shortcut.
  - Converted content send back to active tab need tab URL.
- `contextMenus`
  - Browser action context menu.
  - Web page context menu.
- `downloads`
  - Export preferences by download.
- `notifications`
  - Notify for error.
  - Notify for information like convert done.
- `storage`
  - For saving preferences including custom domain rules and mapping words.
- `unlimitedStorage`
  - Custom domain rules and mapping words could be many.

### Optional Permissions

- `clipboardWrite`
  - Write converted content back to clipboard.
- `clipboardRead`
  - Read to convert content from clipboard.
