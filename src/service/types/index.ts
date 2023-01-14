export enum BrowserType {
  FX = 'FX',
  GC = 'GC',
}

export const BROWSER_TYPE = navigator.userAgent.includes('Firefox') ? BrowserType.FX : BrowserType.GC;
