import type { ParsedResult } from 'tongwen-core/walker';

const updateNode = (parsed: ParsedResult, text: string) => {
  switch (parsed.type) {
    case 'TEXT':
      parsed.node.nodeValue !== text && (parsed.node.nodeValue = text);
      break;
    case 'ELEMENT':
      parsed.node.getAttribute(parsed.attr) !== text && parsed.node.setAttribute(parsed.attr, text);
  }
};

export const updateNodes = (parseds: ParsedResult[], texts: string[]): void =>
  parseds.forEach((parsed, index) => updateNode(parsed, texts[index]));
