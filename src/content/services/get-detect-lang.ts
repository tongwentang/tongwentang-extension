import { dispatchBgAction } from '../../service/runtime/background';
import { ZhType } from '../../service/tabs/tabs.constant';

type GetDetectLanguage = () => Promise<ZhType>;
export const getDetectLanguage: GetDetectLanguage = () => {
  return dispatchBgAction({ type: 'DetectLang', payload: undefined });
};
