import { browser } from '../../service/browser';
import type { SessionState } from './type';

export const getSessionState = async (): Promise<SessionState> => {
  return browser.storage.session.get();
};

export const setSessionState = async (state: Partial<SessionState>) => {
  return browser.storage.session.set(state);
};
