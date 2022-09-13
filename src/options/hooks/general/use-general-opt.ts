import { pipe } from 'ramda';
import { useEffect, useState } from 'react';
import { getDefaultPref } from '../../../preference/default';
import { PrefGeneral } from '../../../preference/types/v2';
import { storage } from '../../../service/storage/storage';
import { getEventChecked, getSelectEventValue } from '../../shared/event-value';

export const useGeneralOpt = () => {
  const [general, set] = useState<PrefGeneral>(getDefaultPref().general);

  const setGeneral =
    <T extends keyof PrefGeneral>(key: T) =>
    (value: PrefGeneral[T]) =>
      storage.set({ general: { ...general, [key]: value } });

  const setAutoConvert = pipe(getSelectEventValue, setGeneral('autoConvert'));

  const setBrowserAction = pipe(getSelectEventValue, setGeneral('browserAction'));

  const setDefaultTarget = pipe(getSelectEventValue, setGeneral('defaultTarget'));

  const setSpaMode = pipe(getEventChecked, setGeneral('spaMode'));

  const setUpdateLang = pipe(getEventChecked, setGeneral('updateLang'));

  const setDebugMode = pipe(getEventChecked, setGeneral('debugMode'));

  useEffect(
    () =>
      storage.listen(changes => changes.general?.newValue && set(changes.general?.newValue), {
        keys: ['general'],
        areaName: ['local'],
      }),
    [],
  );

  useEffect(() => {
    storage.get('general').then(({ general }) => set(general));
  }, []);

  return {
    general,
    setGeneral,
    setAutoConvert,
    setBrowserAction,
    setDefaultTarget,
    setSpaMode,
    setUpdateLang,
    setDebugMode,
  };
};
