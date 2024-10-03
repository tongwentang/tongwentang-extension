import type { ChangeEventHandler } from 'react';
import { useEffect, useState } from 'react';
import { LangType } from 'tongwen-core/dictionaries';
import { getDefaultPref } from '../../../preference/default';
import type { Pref } from '../../../preference/types/lastest';
import { getStorage, listenStorage, setStorage } from '../../../service/storage/storage';

export const useMenu = () => {
  const [menu, set] = useState(getDefaultPref().menu);

  const setMenuEnable: ChangeEventHandler<HTMLInputElement> = async e =>
    setStorage({ menu: { ...menu, enabled: e.currentTarget.checked } });
  const setWebS2t: ChangeEventHandler<HTMLInputElement> = async e =>
    setStorage({
      menu: {
        ...menu,
        group: { ...menu.group, webpage: { ...menu.group.webpage, [LangType.s2t]: e.currentTarget.checked } },
      },
    });
  const setWebT2s: ChangeEventHandler<HTMLInputElement> = async e =>
    setStorage({
      menu: {
        ...menu,
        group: { ...menu.group, webpage: { ...menu.group.webpage, [LangType.t2s]: e.currentTarget.checked } },
      },
    });
  const setTextS2t: ChangeEventHandler<HTMLInputElement> = async e =>
    setStorage({
      menu: {
        ...menu,
        group: { ...menu.group, textarea: { ...menu.group.textarea, [LangType.s2t]: e.currentTarget.checked } },
      },
    });
  const setTextT2s: ChangeEventHandler<HTMLInputElement> = async e =>
    setStorage({
      menu: {
        ...menu,
        group: { ...menu.group, textarea: { ...menu.group.textarea, [LangType.t2s]: e.currentTarget.checked } },
      },
    });

  useEffect(
    () =>
      listenStorage(
        changes => {
          set(changes.menu?.newValue as Pref['menu']);
        },
        { keys: ['menu'], areaName: ['local'] },
      ),
    [],
  );

  useEffect(() => {
    getStorage('menu').then(({ menu }) => {
      set(menu);
    });
  }, []);

  return { menu, setMenuEnable, setWebS2t, setWebT2s, setTextS2t, setTextT2s };
};
