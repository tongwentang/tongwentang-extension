import { bgGetPref } from '../state/storage';

export const bgLog = (...args: unknown[]) => {
  return bgGetPref().then(pref => void (pref.general.debugMode && console.debug(...args)));
};
