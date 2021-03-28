import { BgActDetectLang, BgActType } from '../../service/runtime/interface';
import { runtime } from '../../service/runtime/runtime';
import { ZhType } from '../../service/tabs/tabs.constant';

type GetDetectLanguage = () => Promise<ZhType>;
export const getDetectLanguage: GetDetectLanguage = () => {
  const msg: BgActDetectLang = { type: BgActType.DetectLang, payload: ZhType.und };
  return runtime.sendMessage(msg).then(({ payload }: BgActDetectLang) => payload);
};
