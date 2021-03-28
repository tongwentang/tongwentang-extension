import { LangType } from 'tongwen-core';
import { ZhType } from '../../service/tabs/tabs.constant';
import { convertNode } from '../convert';
import { CtState } from '../state';

export const handleWebpage = (state: CtState, target: LangType) =>
  convertNode(state, target, [document]).then(
    () => (state.zhType = target === LangType.s2t ? ZhType.hant : ZhType.hans),
  );
