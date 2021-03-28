import { equals, findIndex, ifElse, pipe, prepend, propEq, remove, update } from 'ramda';
import { Pref } from '../../preference/types/lastest';
import { PrefFilterRule } from '../../preference/types/v2';
import { storage } from './storage';

export type StoreReducer = (store: Pref) => Partial<Pref>;
export const patchLocalStorage = (reducer: StoreReducer): Promise<void> =>
  storage.get().then(reducer).then(storage.set);

export const addFilterRule = (rule: PrefFilterRule): Promise<void> =>
  patchLocalStorage(({ filter: { enabled, rules } }) => {
    return {
      filter: {
        enabled,
        rules: pipe(
          findIndex(propEq('pattern', rule.pattern)),
          ifElse(
            equals(-1),
            () => prepend(rule, rules),
            index => update(index, rule, rules),
          ),
        )(rules),
      },
    };
  });

export const updateFilterRule = (rule: PrefFilterRule, index: number): Promise<void> =>
  patchLocalStorage(({ filter: { enabled, rules } }) => ({
    filter: {
      enabled,
      rules: update(index, rule, rules).filter((r, i) => i === index || (i !== index && r.pattern !== rule.pattern)),
    },
  }));

export const deleteFilterRule = (index: number): Promise<void> =>
  patchLocalStorage(({ filter: { enabled, rules } }) => ({
    filter: {
      enabled,
      rules: remove(index, 1, rules),
    },
  }));
