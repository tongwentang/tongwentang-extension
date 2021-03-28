import { ParsedNode } from 'tongwen-core/esm/walker/types';

const updateNode = (parsed: ParsedNode, text: string) => {
  switch (parsed.type) {
    case 'TEXT':
      parsed.node.nodeValue = text;
      break;
    case 'ATTRIBUTE':
      parsed.node.setAttribute(parsed.attr, text);
  }
};

export const updateNodes = (parseds: ParsedNode[], texts: string[]): void =>
  parseds.forEach((parsed, index) => updateNode(parsed, texts[index]));
