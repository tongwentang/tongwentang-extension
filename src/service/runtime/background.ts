import { LangType } from 'tongwen-core';
import { MaybeTransTarget } from '../../preference/types/types';
import { FilterTarget } from '../../preference/types/v2';
import { browser } from '../browser';
import { ZhType } from '../tabs/tabs.constant';
import { ReqAction, ReqActionDispatcher, ReqActionHandler, TActionMap, TActionPayload } from './action';

export type BgActionMap = TActionMap<{
  Convert: TActionPayload<{ target: LangType; text: string }, string>;
  NodesText: TActionPayload<{ target: LangType; texts: string[] }, string[]>;
  DetectLang: TActionPayload<void, ZhType>;
  FilterTarget: TActionPayload<void, FilterTarget | undefined>;
  AutoConvert: TActionPayload<void, MaybeTransTarget>;
  ConvertClipboard: TActionPayload<LangType, void>;
  GetTarget: TActionPayload<void, MaybeTransTarget>;
  SpaMode: TActionPayload<void, boolean>;
  Log: TActionPayload<any[], void>;
}>;

export type BgReqAction = ReqAction<BgActionMap>;

export const handleBgReqAction: ReqActionHandler<BgActionMap> = (_, repP) => repP;

export const dispatchBgAction: ReqActionDispatcher<BgActionMap> = action => {
  return browser.runtime.sendMessage(action);
};
