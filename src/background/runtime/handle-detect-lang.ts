import { BgActDetectLang } from '../../service/runtime/interface';
import { detectLanguage } from '../../service/tabs/detect-language';

export const handleDetectLang = (req: BgActDetectLang, tabId: number): Promise<BgActDetectLang> =>
  detectLanguage(tabId).then(zhType => ({ ...req, payload: zhType }));
