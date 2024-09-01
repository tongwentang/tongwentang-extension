import { patchRulesRegExp } from '../../preference/filter-rule';
import type { Pref } from '../../preference/types/lastest';
import { setBadge } from '../../service/browser-action/set-badge';
import { createMenu } from '../../service/menu/create-menu';
import { getStorage, initialStorage, setStorage, type StorageChanges } from '../../service/storage/storage';

let state: Pref | undefined;
let queue: Promise<Pref> | null = null;

export const bgInitialPref = () => {
  return (queue = initialStorage().then(pref => (state = pref)));
};

export const bgGetPref = () => {
  return state ? Promise.resolve(state) : queue ? queue : (queue = getStorage().then(p => (state = p)));
};

export const bgSetPref = (...args: Parameters<typeof setStorage>) => {
  return setStorage(...args).then(() => (queue = getStorage().then(p => (state = p))));
};

export const bgHandlePrefUpdate = (changes: StorageChanges): void => {
  return Object.entries(changes).forEach(async ([key, change]) => {
    switch (key as keyof Pref) {
      case 'general':
        if (change?.newValue) {
          const general = change.newValue as Pref['general'];
          state && (state.general = general);
          setBadge(general);
        }
        break;
      case 'menu':
        if (change?.newValue) {
          const menu = change!.newValue as Pref['menu'];
          state && (state.menu = menu);
          await createMenu(menu);
        }
        break;
      case 'filter':
        if (change?.newValue) {
          const filter = change!.newValue as Pref['filter'];
          state && (state.filter = Object.assign(filter, { ...filter, rules: patchRulesRegExp(filter.rules) }));
        }
        break;
      case 'word':
        if (change?.newValue) {
          const word = change!.newValue as Pref['word'];
          state && (state.word = word);
        }
        break;
    }
  });
};
