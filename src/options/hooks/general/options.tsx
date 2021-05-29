import { i18n } from '../../../service/i18n/i18n';
import { entriesToOption } from '../../shared/entries-to-option';

export const autoConvertOptions = () =>
  (
    [
      ['disabled', i18n.getMessage('MSG_DISABLED')],
      ['s2t', i18n.getMessage('MSG_S2T')],
      ['t2s', i18n.getMessage('MSG_T2S')],
      ['ds2t', i18n.getMessage('MSG_DETECTIVE_S2T')],
      ['dt2s', i18n.getMessage('MSG_DETECTIVE_T2S')],
    ] as [string, string][]
  ).map(entriesToOption);

export const browserActionOptions = () =>
  (
    [
      ['auto', i18n.getMessage('MSG_AUTO_CONVERT')],
      ['s2t', i18n.getMessage('MSG_S2T')],
      ['t2s', i18n.getMessage('MSG_T2S')],
    ] as [string, string][]
  ).map(entriesToOption);

export const defaultTargetOptions = () =>
  (
    [
      ['s2t', i18n.getMessage('MSG_S2T')],
      ['t2s', i18n.getMessage('MSG_T2S')],
    ] as [string, string][]
  ).map(entriesToOption);
