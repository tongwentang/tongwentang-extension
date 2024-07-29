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
      return [action.payload, ...rules];
    case 'UPDATE':
      return Object.assign([...rules], { [rules.findIndex(r => r.id === action.payload.id)]: action.payload });
    case 'DELETE':
      return rules.filter(r => r.id !== action.payload.id);
    case 'UP':
      return Object.assign([...rules], {
        [action.payload - 1]: rules[action.payload],
        [action.payload]: rules[action.payload - 1],
      });
    case 'DOWN':
      return Object.assign([...rules], {
        [action.payload]: rules[action.payload + 1],
        [action.payload + 1]: rules[action.payload],
      });
    case 'RESET':
      return action.payload;
  }
};

const useFilterRules = (org: PrefFilterRule[]) => {
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
