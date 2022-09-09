import { LangType, walkNode } from 'tongwen-core';
import { convertNodesText } from '../services';
import { CtState } from '../state';
import { updateHtmlLang } from './update-html-lang';
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
          updateHtmlLang(document.documentElement, target);
          updateNodes(parsedNodes, texts);
          state.mutationObserver?.observe(document, state.mutationOpt);
        }));
};
