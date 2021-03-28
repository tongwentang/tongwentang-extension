import { BgActNodeText } from '../../service/runtime/interface';
import { BgState } from '../state';

export const handleNodeText = (state: BgState, req: BgActNodeText): BgActNodeText => ({
  ...req,
  payload: {
    ...req.payload,
    texts: req.payload.texts.map(state.converter.phrase.bind(null, req.payload.target)),
  },
});
