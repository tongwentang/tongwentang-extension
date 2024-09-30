import { BrowserType } from '../../service/types';
import { getDefaultPref } from '../default';
import { v1SchemaFx, v1SchemaGc } from '../schema/v1';
import { v2Schema } from '../schema/v2';
import type { Pref } from '../types/lastest';
import { prefFxV1ToV2 } from './pref-fx-v1-to-v2';
import { prefGcV1ToV2 } from './pref-gc-v1-to-v2';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const safeUpgradePref = (type: BrowserType, pref: any = {}): Pref => {
  switch (true) {
    case pref?.version === 2:
      return v2Schema(pref).value();
    case pref?.version === 1 && type === BrowserType.FX:
      return safeUpgradePref(type, prefFxV1ToV2(v1SchemaFx(pref).value()));
    case Number.parseInt(pref?.version) === 1 && type === BrowserType.GC:
      return safeUpgradePref(type, prefGcV1ToV2(v1SchemaGc(pref).value()));
    default:
      return getDefaultPref();
  }
};
