export const classEntries = (cn: Record<string, boolean>): string =>
  Object.entries(cn)
    .filter(([_, value]) => value)
    .map(([key]) => key)
    .join(' ');
