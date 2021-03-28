export enum BrowserType {
  FX = 'FX',
  GC = 'GC',
}

export const BROWSER_TYPE = window.browser ? BrowserType.FX : BrowserType.GC;
