import { useCallback, useState } from 'react';

export const useToggle = (b: boolean) => {
  const [state, setState] = useState(b);
  const on = useCallback(() => { setState(true); }, []);
  const off = useCallback(() => { setState(false); }, []);
  const toggle = useCallback(() => { setState(s => !s); }, []);
  const set = useCallback((b: boolean) => { setState(b); }, []);
  return [state, { on, off, toggle, set }] as const;
};
