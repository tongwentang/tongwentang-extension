import { LangType } from 'tongwen-core/dictionaries';
import { i18n } from '../../../service/i18n/i18n';
import { entriesToOption } from '../../shared/entries-to-option';

export const FilterRuleTargetOptions = () =>
  (
    [
      ['disabled', i18n.getMessage('MSG_DISABLED')],
      [LangType.s2t, i18n.getMessage('MSG_S2T')],
      [LangType.t2s, i18n.getMessage('MSG_T2S')],
    ] as [string, string][]
  ).map(entriesToOption);
