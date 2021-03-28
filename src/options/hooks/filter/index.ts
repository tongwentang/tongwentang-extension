import { dec, eqProps, findIndex, inc, move, prepend, remove, update } from 'ramda';
import { Reducer, useEffect, useReducer, useState } from 'react';
import { getDefaultPref } from '../../../preference/default';
import { PrefFilterRule } from '../../../preference/types/v2';
import { storage } from '../../../service/storage/storage';

export type UseFilterRuleAction =
  | { type: 'DELETE'; payload: PrefFilterRule }
  | { type: 'ADD' | 'UPDATE'; payload: PrefFilterRule }
  | { type: 'UP' | 'DOWN'; payload: number }
  | { type: 'RESET'; payload: PrefFilterRule[] };

const reducer: Reducer<PrefFilterRule[], UseFilterRuleAction> = (rules, action) => {
  switch (action.type) {
    case 'ADD':
      return prepend(action.payload, rules);
    case 'UPDATE':
      return update(findIndex(eqProps('id', action.payload), rules), action.payload, rules);
    case 'DELETE':
      return remove(findIndex(eqProps('id', action.payload), rules), 1, rules);
    case 'UP':
      return move(action.payload, dec(action.payload), rules);
    case 'DOWN':
      return move(action.payload, inc(action.payload), rules);
    case 'RESET':
      return action.payload;
  }
};

export const useFilterRules = (org: PrefFilterRule[]) => {
  const [rules, setRules] = useReducer<Reducer<PrefFilterRule[], UseFilterRuleAction>>(reducer, org);

  return { rules, setRules };
};

export const useFilter = () => {
  const [enabled, setEnable] = useState(getDefaultPref().filter.enabled);

  const { rules, setRules } = useFilterRules(getDefaultPref().filter.rules);

  useEffect(() => {
    storage
      .get('filter')
      .then(({ filter: { enabled, rules } }) => void (setEnable(enabled), setRules({ type: 'RESET', payload: rules })));
  }, []);

  return { enabled, setEnable, rules, setRules };
};
