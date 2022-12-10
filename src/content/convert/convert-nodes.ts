import { LangType, walkNode } from 'tongwen-core';
import { convertNodesText } from '../services';
import { CtState } from '../state';
import { updateLangAttr } from './update-lang-attr';
import { updateNodes } from './update-nodes';

type SConvertNode = (state: CtState, target: LangType, nodes: Node[]) => Promise<void>;
export const convertNode: SConvertNode = async (state, target, nodes) => {
  const parsedNodes = nodes.flatMap(node => walkNode(node));
  return parsedNodes.length === 0
    ? void 0
    : (state.converting = state.converting
        .catch(() => undefined)
        .then(() => convertNodesText(target, parsedNodes))
        .then(texts => {
          state.mutationObserver?.disconnect();
          updateNodes(parsedNodes, texts);
          state.updateLangAttr &&
            document.querySelectorAll<HTMLElement>('[lang|="zh"]').forEach(el => updateLangAttr(el, target));
          state.mutationObserver?.observe(document, state.mutationOpt);
        }));
};
