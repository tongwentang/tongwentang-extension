import { LangType, walkNode } from 'tongwen-core';
import { convertNodesText } from '../services';
import { CtState } from '../state';
import { updateNodes } from './update-nodes';

type SConvertNode = (state: CtState, target: LangType, nodes: Node[]) => Promise<void>;
export const convertNode: SConvertNode = (state, target, nodes) => {
  const parsedNodes = nodes.flatMap(node => walkNode(node));
  return (state.converting = state.converting
    .catch(() => undefined)
    .then(() => convertNodesText(target, parsedNodes))
    .then(texts => {
      state.mutationObserver?.disconnect();
      updateNodes(parsedNodes, texts);
      state.mutationObserver?.observe(document, state.mutationOpt);
    }));
};
