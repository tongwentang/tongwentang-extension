import { assocPath, pipe } from 'ramda';
import { useEffect, useState } from 'react';
import { LangType } from 'tongwen-core';
import { getDefaultPref } from '../../../preference/default';
import { PrefMenu, PrefMenuGroup } from '../../../preference/types/v2';
import { storage } from '../../../service/storage/storage';
import { getEventChecked } from '../../shared/event-value';

export const useMenu = () => {
  const [menu, set] = useState(getDefaultPref().menu);

  const setMenu = (path: [keyof PrefMenu, (keyof PrefMenuGroup)?, LangType?]) => (state: boolean) =>
    storage.set({ menu: assocPath(path as string[], state, menu) });

  const setMenuEnable = pipe(getEventChecked, setMenu(['enabled']));
  const setWebS2t = pipe(getEventChecked, setMenu(['group', 'webpage', LangType.s2t]));
  const setWebT2s = pipe(getEventChecked, setMenu(['group', 'webpage', LangType.t2s]));
  const setTextS2t = pipe(getEventChecked, setMenu(['group', 'textarea', LangType.s2t]));
  const setTextT2s = pipe(getEventChecked, setMenu(['group', 'textarea', LangType.t2s]));

  useEffect(() => storage.listen(changes => set(changes.menu?.newValue), { keys: ['menu'], areaName: ['local'] }), []);

  useEffect(() => {
    storage.get('menu').then(({ menu }) => set(menu));
  }, []);

  return { menu, setMenuEnable, setWebS2t, setWebT2s, setTextS2t, setTextT2s };
};
