import { Pref } from '../../preference/types/lastest';
import { PrefFilterRule } from '../../preference/types/v2';
import { storage } from './storage';

export type StoreReducer = (store: Pref) => Partial<Pref>;
export const patchLocalStorage = (reducer: StoreReducer): Promise<void> =>
  storage.get().then(reducer).then(storage.set);

export const addFilterRule = (rule: PrefFilterRule): Promise<void> => {
  return patchLocalStorage(({ filter: { rules, ...rest } }) => ({
    filter: {
      ...rest,
      rules: (index => (index === -1 ? [rule, ...rules] : Object.assign([...rules], { [index]: rule })))(
        rules.findIndex(r => r.pattern === rule.pattern),
      ),
    },
  }));
};

export const updateFilterRule = (rule: PrefFilterRule, index: number): Promise<void> =>
  patchLocalStorage(({ filter: { enabled, rules } }) => ({
    filter: {
      enabled,
      rules: Object.assign([...rules], { [index]: rule }).filter(r => r.pattern !== rule.pattern),
    },
  }));

export const deleteFilterRule = (index: number): Promise<void> =>
  patchLocalStorage(({ filter: { enabled, rules } }) => ({
    filter: {
      enabled,
      rules: rules.filter((_, i) => i !== index),
    },
  }));
