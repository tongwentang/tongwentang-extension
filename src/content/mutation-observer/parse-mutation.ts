type ParseMutation = (m: MutationRecord) => Node[];
export const parseMutation: ParseMutation = m => {
  switch (true) {
    case m.type === 'characterData':
      return [m.target];
    case m.type === 'childList' && m.addedNodes.length > 0:
      return Array.from(m.addedNodes);
    case m.type === 'attributes':
      return [m.target];
    default:
      return [];
  }
};
