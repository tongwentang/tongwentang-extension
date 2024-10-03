import { dispatchBgAction } from '../../service/runtime/background';
import type { CtState } from '../state';
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
  dispatchBgAction({ type: 'SpaMode', payload: undefined }).then(isSpa => {
    if (isSpa) {
      state.mutationObserver = new MutationObserver(observerFn(state));
      state.mutationObserver.observe(document, state.mutationOpt);
    }
  });
};
