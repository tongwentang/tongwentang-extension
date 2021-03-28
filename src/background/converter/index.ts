import { Converter, createConverterMap, SrcPack } from 'tongwen-core';
import { PrefWord } from '../../preference/types/v2';

const createSrcPack = async ({ default: def, custom }: PrefWord): Promise<SrcPack> => ({
  s2t: [
    def.s2t.char ? await fetch(`dictionaries/s2t-char.json`).then(res => res.json()) : {},
    def.s2t.phrase ? await fetch(`dictionaries/s2t-phrase.json`).then(res => res.json()) : {},
    custom.s2t,
  ],
  t2s: [
    {},
    def.t2s.char ? await fetch(`dictionaries/t2s-char.json`).then(res => res.json()) : {},
    def.t2s.phrase ? await fetch(`dictionaries/t2s-phrase.json`).then(res => res.json()) : {},
  ],
});

type GetConverter = (p: PrefWord) => Promise<Converter>;
export const getConverter: GetConverter = words => createSrcPack(words).then(createConverterMap);
