import { convertNode } from '../convert';
import { getTarget } from '../services';
import { CtState } from '../state';
import { parseMutation } from './parse-mutation';

export type ExhaustMutations = (s: CtState, m: MutationRecord[]) => void;
export const exhaustMutations: ExhaustMutations = (state, mutations) => {
  getTarget().then(target => target && convertNode(state, target, mutations.flatMap(parseMutation)));
};
