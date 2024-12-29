import { useEffect, useState } from 'react';
import { getDefaultPref } from '../../../preference/default';
import type { PrefWord } from '../../../preference/types/v2';
import { getStorage, listenStorage } from '../../../service/storage/storage';

export const useWord = () => {
  const [word, setWord] = useState<PrefWord>(getDefaultPref().word);

  listenStorage(
    ({ word }) => {
      setWord(word?.newValue as PrefWord);
    },
    { keys: ['word'], areaName: ['local'] },
  );

  useEffect(
    () =>
      void getStorage('word').then(({ word }) => {
        setWord(word);
      }),
    [],
  );

  return { word, setWord };
};
