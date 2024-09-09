import { LangType } from 'tongwen-core/dictionaries';
import { MaybeTransTarget } from '../../preference/types/types';
import { FilterTarget } from '../../preference/types/v2';
import { ZhType } from '../tabs/tabs.constant';

interface WeReqAction<T, P> {
  type: T;
  payload: P;
}

/* req and res for background */
export enum BgActType {
  Convert = 'CONVERT',
  NodesText = 'NODES_TEXT',
  ConvertClipboard = 'CONVERT_CLIPBOARD',
  DetectLang = 'DETECT_LANG',
  FilterTarget = 'FILTER_TARGET',
  GetTarget = 'GET_TARGET',
  AutoConvertOpt = 'AUTO_CONVERT_OPT',
  SpaMode = 'SPA_MODE',
  Log = 'Log',
}

export type BgAct =
  | BgActConvert
  | BgActNodeText
  | BgActDetectLang
  | BgActFilterTarget
  | BgActAutoConvert
  | BgActConvertClipboard
  | BgActGetTarget
  | BgActSpaMode
  | BgActLog;

export type BgActConvert = WeReqAction<BgActType.Convert, { target: LangType; text: string }>;

export type BgActNodeText = WeReqAction<BgActType.NodesText, { target: LangType; texts: string[] }>;

export type BgActDetectLang = WeReqAction<BgActType.DetectLang, ZhType>;

export type BgActFilterTarget = WeReqAction<BgActType.FilterTarget, FilterTarget | undefined>;

export type BgActGetTarget = WeReqAction<BgActType.GetTarget, MaybeTransTarget>;

export type BgActAutoConvert = WeReqAction<BgActType.AutoConvertOpt, LangType | undefined>;

export type BgActConvertClipboard = WeReqAction<BgActType.ConvertClipboard, LangType>;

export type BgActSpaMode = WeReqAction<BgActType.SpaMode, boolean>;

export type BgActLog = WeReqAction<BgActType.Log, any[]>;

/* req and res for content */
export enum CtActType {
  Textarea = 'TEXTAREA',
  Webpage = 'WEBPAGE',
  ZhType = 'ZHTYPE',
}

export type CtAct = CtActTextArea | CtActWebPage | CtActZhType;

export type CtActTextArea = WeReqAction<CtActType.Textarea, LangType>;

export type CtActWebPage = WeReqAction<CtActType.Webpage, LangType>;

export type CtActZhType = WeReqAction<CtActType.ZhType, ZhType>;
