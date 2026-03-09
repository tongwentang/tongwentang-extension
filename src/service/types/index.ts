export enum BrowserType {
  FX = 'FX',
  GC = 'GC',
}

const userAgent = navigator.userAgent;

export const IS_SAFARI = /Safari/.test(userAgent) && !/Chrome|Chromium|CriOS|Edg|OPR|Firefox|FxiOS/.test(userAgent);

export const BROWSER_TYPE = userAgent.includes('Firefox') ? BrowserType.FX : BrowserType.GC;
