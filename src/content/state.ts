import { TARGET_NODE_ATTRIBUTES } from 'tongwen-core';
import { storage } from '../service/storage/storage';
import { ZhType } from '../service/tabs/tabs.constant';
import { getDetectLanguage } from './services';

const mutationOpt: MutationObserverInit = {
  childList: true,
  attributes: true,
  characterData: true,
  subtree: true,
  attributeFilter: TARGET_NODE_ATTRIBUTES as string[],
};

export interface CtState {
  zhType: ZhType;
  updateLang: boolean;
  debugMode: boolean;
  timeoutId: number | undefined;
  mutationOpt: MutationObserverInit;
  mutationObserver?: MutationObserver;
  mutations: MutationRecord[];
  converting: Promise<any>;
}

const getUpdateLang = () => storage.get('general').then(({ general }) => general.updateLang);
const getDebugMode = () => storage.get('general').then(({ general }) => general.debugMode);

export async function createCtState(): Promise<CtState> {
  return Promise.all([getDetectLanguage(), getUpdateLang(), getDebugMode()]).then(
    ([zhType, updateLang, debugMode]) => ({
      zhType,
      updateLang,
      debugMode,
      timeoutId: undefined,
      mutationOpt,
      mutations: [],
      converting: Promise.resolve(null),
    }),
  );
}
