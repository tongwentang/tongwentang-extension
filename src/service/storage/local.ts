import type { Pref } from '../../preference/types/lastest';
import type { PrefFilterRule } from '../../preference/types/v2';
import { getStorage, setStorage } from './storage';

export type StoreReducer = (store: Pref) => Partial<Pref>;
export const patchLocalStorage = async (reducer: StoreReducer): Promise<void> => getStorage().then(reducer).then(setStorage);

export const addFilterRule = async (rule: PrefFilterRule): Promise<void> => {
  return patchLocalStorage(({ filter: { rules, ...rest } }) => ({
    filter: {
      ...rest,
      rules: (index => (index === -1 ? [rule, ...rules] : Object.assign([...rules], { [index]: rule })))(
        rules.findIndex(r => r.pattern === rule.pattern),
      ),
    },
  }));
};

export const updateFilterRule = async (rule: PrefFilterRule, index: number): Promise<void> =>
  patchLocalStorage(({ filter: { enabled, rules } }) => ({
    filter: {
      enabled,
      rules: Object.assign([...rules], { [index]: rule }).filter(r => r.pattern !== rule.pattern),
    },
  }));

export const deleteFilterRule = async (index: number): Promise<void> =>
  patchLocalStorage(({ filter: { enabled, rules } }) => ({
    filter: {
      enabled,
      rules: rules.filter((_, i) => i !== index),
    },
  }));
