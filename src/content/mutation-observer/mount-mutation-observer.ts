import { BgActSpaMode, BgActType } from '../../service/runtime/interface';
import { runtime } from '../../service/runtime/runtime';
import { CtState } from '../state';
import { exhaustMutations } from './exhaust-mutations';

type ObserverFn = (s: CtState) => (m: MutationRecord[]) => void;
const observerFn: ObserverFn = state => mutations => {
  clearTimeout(state.timeoutId);
  state.mutations.push(...mutations);
  state.timeoutId = window.setTimeout(() => {
    const mutations = [...state.mutations];
    state.mutations = [];
    exhaustMutations(state, mutations);
  }, 1000);
};

export const mountMutationObserver = async (state: CtState): Promise<void> => {
  const msg: BgActSpaMode = { type: BgActType.SpaMode, payload: true };
  return runtime.sendMessage(msg).then(({ payload: isSpa }) => {
    if (isSpa) {
      state.mutationObserver = new MutationObserver(observerFn(state));
      state.mutationObserver.observe(document, state.mutationOpt);
    }
  });
};
