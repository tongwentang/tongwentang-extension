import { Converter, createConverterMap, LangType, SrcPack, type DicObj } from 'tongwen-core';
import { PrefWord } from '../../preference/types/v2';
import { bgGetPref } from '../state/storage';

const getDict = (dir: LangType, type: 'char' | 'phrase') => {
  return fetch(`dictionaries/${dir}-${type}.min.json`).then(r => r.json() as Promise<DicObj>);
};

const createSrcPack = ({ default: def, custom }: PrefWord): Promise<SrcPack> => {
  return Promise.all([
    def.s2t.char ? getDict(LangType.s2t, 'char') : {},
    def.s2t.phrase ? getDict(LangType.s2t, 'phrase') : {},
    def.t2s.char ? getDict(LangType.t2s, 'char') : {},
    def.t2s.phrase ? getDict(LangType.t2s, 'phrase') : {},
  ]).then(([ss, sp, ts, tp]) => ({ s2t: [ss, sp, custom.s2t], t2s: [ts, tp, custom.t2s] }));
};

let converter: Converter | undefined = undefined;
let queue: Promise<Converter> | undefined = undefined;

export const getConverter = (): Promise<Converter> => {
  return converter
    ? Promise.resolve(converter)
    : (queue ??
        (queue = bgGetPref()
          .then(pref => createSrcPack(pref.word))
          .then(src => (converter = createConverterMap(src)))));
};
