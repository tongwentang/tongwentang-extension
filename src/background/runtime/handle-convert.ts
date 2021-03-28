import { BgActConvert } from '../../service/runtime/interface';
import { BgState } from '../state';

export const handleConvert = (state: BgState, req: BgActConvert): BgActConvert => ({
  ...req,
  payload: { ...req.payload, text: state.converter.phrase(req.payload.target, req.payload.text) },
});
