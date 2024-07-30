import { ChangeEventHandler, useEffect, useState } from 'react';
import { LangType } from 'tongwen-core';
import { getDefaultPref } from '../../../preference/default';
import { AutoConvertOpt, BrowserActionOpt, PrefGeneral } from '../../../preference/types/v2';
import { getStorage, listenStorage, setStorage } from '../../../service/storage/storage';

export const useGeneralOpt = () => {
  const [general, set] = useState<PrefGeneral>(getDefaultPref().general);

  const setGeneral = <T extends keyof PrefGeneral>(key: T, value: PrefGeneral[T]) =>
    setStorage({ general: { ...general, [key]: value } });
  const setAutoConvert: ChangeEventHandler<HTMLSelectElement> = e =>
    void setGeneral('autoConvert', e.currentTarget.value as AutoConvertOpt);
  const setBrowserAction: ChangeEventHandler<HTMLSelectElement> = e =>
    void setGeneral('browserAction', e.currentTarget.value as BrowserActionOpt);
  const setDefaultTarget: ChangeEventHandler<HTMLSelectElement> = e =>
    void setGeneral('defaultTarget', e.currentTarget.value as LangType);
  const setSpaMode: ChangeEventHandler<HTMLInputElement> = e => void setGeneral('spaMode', e.currentTarget.checked);
  const setUpdateLangAttr: ChangeEventHandler<HTMLInputElement> = e =>
    void setGeneral('updateLangAttr', e.currentTarget.checked);
  const setDebugMode: ChangeEventHandler<HTMLInputElement> = e => void setGeneral('debugMode', e.currentTarget.checked);

  useEffect(
    () =>
      listenStorage(changes => changes.general?.newValue && set(changes.general?.newValue), {
        keys: ['general'],
        areaName: ['local'],
      }),
    [],
  );

  useEffect(() => {
    getStorage('general').then(({ general }) => set(general));
  }, []);

  return {
    general,
    setGeneral,
    setAutoConvert,
    setBrowserAction,
    setDefaultTarget,
    setSpaMode,
    setUpdateLangAttr,
    setDebugMode,
  };
};
