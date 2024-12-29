import type { LangType } from 'tongwen-core/dictionaries';
import type { Tabs } from 'webextension-polyfill';
import { browser } from '../browser';
import type { ZhType } from '../tabs/tabs.constant';
import type { ReqAction, ReqActionDispatcher, ReqActionHandler, TActionMap, TActionPayload } from './action';

export type CtActionMap = TActionMap<{
  Textarea: TActionPayload<LangType, void>;
  Webpage: TActionPayload<LangType, void>;
  ZhType: TActionPayload<void, ZhType>;
}>;

export type CtReqAction = ReqAction<CtActionMap>;

export const handleCtReqAction: ReqActionHandler<CtActionMap> = async (_, repP) => repP;

export const dispatchCtAction: ReqActionDispatcher<CtActionMap, [tabId: NonNullable<Tabs.Tab['id']>]> = async (
  action,
  tabId,
) => {
  return browser.tabs.sendMessage(tabId, action);
};
