import { BrowserType } from '../../service/types';
import { v1SchemaFx, v1SchemaGc } from '../schema/v1';
import { v2Schema } from '../schema/v2';

export const validatePref = (code: BrowserType) => (pref: Record<string, any>) => {
  switch (true) {
    case code === BrowserType.FX && pref.version === 1:
      return v1SchemaFx(pref);
    case code === BrowserType.GC && Number.parseInt(pref.version) === 1:
      return v1SchemaGc(pref);
    default:
      return v2Schema(pref);
  }
};
