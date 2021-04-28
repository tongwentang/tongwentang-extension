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
  debugMode: boolean;
  timeoutId: number | undefined;
  mutationOpt: MutationObserverInit;
  mutationObserver?: MutationObserver;
  mutations: MutationRecord[];
  converting: Promise<any>;
}

const getDebugMode = () => storage.get('general').then(({ general }) => general.debugMode);

export async function createCtState(): Promise<CtState> {
  return Promise.all([getDetectLanguage(), getDebugMode()]).then(([zhType, debugMode]) => ({
    zhType,
    debugMode,
    timeoutId: undefined,
    mutationOpt,
    mutations: [],
    converting: Promise.resolve(null),
  }));
}
