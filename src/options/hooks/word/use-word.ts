import { useEffect, useState } from 'react';
import { getDefaultPref } from '../../../preference/default';
import { PrefWord } from '../../../preference/types/v2';
import { storage } from '../../../service/storage/storage';

export const useWord = () => {
  const [word, setWord] = useState<PrefWord>(getDefaultPref().word);

  storage.listen(({ word }) => setWord(word?.newValue), { keys: ['word'], areaName: ['local'] });

  useEffect(
    () =>
      void storage.get('word').then(({ word }) => {
        setWord(word);
      }),
    [],
  );

  return { word, setWord };
};
