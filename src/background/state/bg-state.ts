import { Converter } from 'tongwen-core';
import { patchRulesRegExp } from '../../preference/filter-rule';
import { Pref } from '../../preference/types/lastest';
import { MenuId } from '../../service/menu/create-menu';
import { initialStorage } from '../../service/storage/storage';
import { Logger, loggerWith } from '../../utilities';
import { getConverter } from '../converter';

export interface BgState {
  pref: Pref;
  menuId?: MenuId;
  converter: Converter;
  logger: Logger;
}

const patchRegExp: (pref: Pref) => Pref = pref =>
  Object.assign(pref, { filter: Object.assign(pref.filter, { rules: patchRulesRegExp(pref.filter.rules) }) });

export const updateLogger = (state: BgState) => {
  state.logger = loggerWith(state.pref.general.debugMode);
};

export const createBgState = async (): Promise<BgState> =>
  initialStorage()
    .then(pref => Promise.all([patchRegExp(pref), getConverter(pref.word)]))
    .then(([pref, converter]) => ({ pref, converter, logger: loggerWith(pref.general.debugMode) }));
