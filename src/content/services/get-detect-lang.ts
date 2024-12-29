import { dispatchBgAction } from '../../service/runtime/background';
import type { ZhType } from '../../service/tabs/tabs.constant';

type GetDetectLanguage = () => Promise<ZhType>;
export const getDetectLanguage: GetDetectLanguage = async () => {
  return dispatchBgAction({ type: 'DetectLang', payload: undefined });
};
