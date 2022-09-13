import { LangType } from 'tongwen-core';
import { Auto, DetTransTarget, Disabled, TransTarget } from '../types';

export type AutoConvertOpt = Disabled | DetTransTarget | TransTarget;

export type BrowserActionOpt = Auto | TransTarget;

export interface PrefGeneral {
  autoConvert: AutoConvertOpt;
  browserAction: BrowserActionOpt;
  defaultTarget: LangType;
  spaMode: boolean;
  updateLang: boolean;
  debugMode: boolean;
}
