import { bgGetPref } from '../state/storage';

export const bgLog = async (...args: unknown[]) => {
  return bgGetPref().then(pref => void (pref.general.debugMode && console.debug(...args)));
};
