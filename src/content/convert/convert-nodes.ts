import { LangType, walkNode } from 'tongwen-core';
import { dispatchBgAction } from '../../service/runtime/background';
import { ZhType } from '../../service/tabs/tabs.constant';
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
        .then(() => dispatchBgAction({ type: 'NodesText', payload: { target, texts: parsedNodes.map(n => n.text) } }))
        .then(texts => {
          state.mutationObserver?.disconnect();
          updateNodes(parsedNodes, texts);
          state.mutationObserver?.observe(document, state.mutationOpt);
          state.updateLangAttr &&
            document.querySelectorAll<HTMLElement>('[lang|="zh"]').forEach(el => updateLangAttr(el, target));

          switch (target) {
            case LangType.s2t:
              state.zhType = ZhType.hant;
              break;
            case LangType.t2s:
              state.zhType = ZhType.hans;
              break;
            default:
              state.zhType = ZhType.und;
          }
        }));
};
