import { LangType } from 'tongwen-core';
import { Pref } from '../../preference/types/lastest';
import { BrowserActionOpt } from '../../preference/types/v2';
import { browserAction } from './browser-action';

const browserActionToBadge = (ba: BrowserActionOpt) => (ba === 'auto' ? 'A' : ba === LangType.s2t ? 'T' : 'S');

const color = '#C0C0C0';

export const setBadge = (pref: Pref) => {
  const text = browserActionToBadge(pref.general.browserAction);
  const setText = browserAction.setBadgeText({ text });
  const setBg = browserAction.setBadgeBackgroundColor({ color });

  return Promise.all([setText, setBg]);
};
