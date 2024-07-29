import { LangType } from 'tongwen-core';
import { Tabs } from 'webextension-polyfill';
import { browser } from '../browser';
import { ZhType } from '../tabs/tabs.constant';
import { ReqAction, ReqActionDispatcher, ReqActionHandler, TActionMap, TActionPayload } from './action';

export type CtActionMap = TActionMap<{
  Textarea: TActionPayload<LangType, void>;
  Webpage: TActionPayload<LangType, void>;
  ZhType: TActionPayload<void, ZhType>;
}>;

export type CtReqAction = ReqAction<CtActionMap>;

export const handleCtReqAction: ReqActionHandler<CtActionMap> = (_, repP) => repP;

export const dispatchCtAction: ReqActionDispatcher<CtActionMap, [tabId: NonNullable<Tabs.Tab['id']>]> = (
  action,
  tabId,
) => {
  return browser.tabs.sendMessage(tabId, action);
};
