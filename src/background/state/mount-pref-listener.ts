import { BgState, updateLogger } from '.';
import { patchRulesRegExp } from '../../preference/filter-rule';
import { Pref } from '../../preference/types/lastest';
import { PrefFilter } from '../../preference/types/v2';
import { setBadge } from '../../service/browser-action/set-badge';
import { createMenu } from '../../service/menu/create-menu';
import { listenStorage } from '../../service/storage/storage';
import { getConverter } from '../converter';

export function mountPrefListener(state: BgState) {
  listenStorage(
    changes => {
      state.logger('[BG_RECEIVE_SYNC_PREF_CHANGE]', changes);

      return Object.entries(changes).forEach(async ([key, change]) => {
        switch (key as keyof Pref) {
          case 'general':
            if (change?.newValue) {
              state.pref.general = change!.newValue;
              setBadge(state.pref);
              updateLogger(state);
            }
            break;
          case 'menu':
            if (change?.newValue) {
              state.pref.menu = change!.newValue;
              await createMenu(state);
            }
            break;
          case 'filter':
            if (change?.newValue) {
              const filter = change!.newValue as PrefFilter;
              state.pref.filter = Object.assign(filter, { ...filter, rules: patchRulesRegExp(filter.rules) });
            }
            break;
          case 'word':
            if (change?.newValue) {
              state.pref.word = change!.newValue;
              state.converter = await getConverter(state.pref.word);
            }
            break;
        }
      });
    },
    { areaName: ['local'] },
  );
}
