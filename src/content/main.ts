import { convertNode } from './convert';
import { mountMutationObserver } from './mutation-observer';
import { mountRuntimeListener } from './runtime';
import { getTarget } from './services';
import { createCtState, CtState } from './state';

(async function main() {
  const state: CtState = await createCtState();

  mountRuntimeListener(state);
  await mountMutationObserver(state);

  const target = await getTarget().catch(console.error);
  target && convertNode(state, target, [document]).catch(console.error);
})();
