import { convertNode } from './convert';
import { mountMutationObserver } from './mutation-observer';
import { mountRuntimeListener } from './runtime/mount-runtime-listener';
import { getTarget } from './services';
import type { CtState } from './state';
import { createCtState } from './state';

(async function main() {
  const state: CtState = await createCtState();

  mountRuntimeListener(state);
  await mountMutationObserver(state);

  const target = await getTarget().catch(console.error);
  (target != null) && convertNode(state, target, [document]).catch(console.error);
})();
