import type { Storage } from 'webextension-polyfill';
import browser from 'webextension-polyfill';
import { getDefaultPref } from '../../preference/default';
import type { Pref, PrefKeys, PrefPick } from '../../preference/types/lastest';
import { safeUpgradePref, validatePref } from '../../preference/upgrade';
import { BROWSER_TYPE } from '../types';

type StorageAreaName = Exclude<keyof Storage.Static, 'onChanged'>;
export type StorageChanges = Partial<{ [P in PrefKeys]: Storage.StorageChange }>;
type StorageListener<A extends StorageAreaName> = (store: StorageChanges, areaName: A) => void;

const updatePrefTime = (pref: Partial<Pref>): Partial<Pref> => ({ ...pref, meta: { update: Date.now() } });

export const getStorage = async <T extends PrefKeys>(
  keys?: T,
): Promise<typeof keys extends undefined ? Pref : PrefPick<T>> => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return browser.storage.local.get(keys) as any;
};

export const setStorage = async (data: Partial<Pref>): Promise<void> => browser.storage.local.set(updatePrefTime(data));

/**
 * reset pref, if undefined or null given, reset to default pref
 */
export const resetStorage = async (pref?: Pref) => {
  return browser.storage.local
    .clear()
    .then(async () => browser.storage.local.set((pref as unknown as Record<string, unknown>) || getDefaultPref()));
};

export const listenStorage = <PKey extends PrefKeys, AreaName extends StorageAreaName>(
  listener: StorageListener<AreaName>,
  opt: Partial<{ keys: PKey[]; areaName: AreaName[] }> = {},
): (() => void) => {
  const wrapper = (changes: StorageChanges, areaName: StorageAreaName) => {
    opt.areaName && !opt.areaName.includes(areaName as AreaName)
      ? null
      : !Array.isArray(opt.keys)
        ? listener(changes, areaName as AreaName)
        : Object.keys(changes).some(key => opt.keys?.includes(key as PKey))
          ? listener(changes, areaName as AreaName)
          : null;
  };

  browser.storage.onChanged.addListener(wrapper as never);
  return () => {
    browser.storage.onChanged.removeListener(wrapper as never);
  };
};

export const initialStorage = async (): Promise<Pref> => {
  return browser.storage.local
    .get()
    .then(validatePref(BROWSER_TYPE))
    .then(async holder => (holder.invalid && (await browser.storage.local.clear()), holder.value()))
    .then(pref => safeUpgradePref(BROWSER_TYPE, pref))
    .then(async pref => (await browser.storage.local.set(pref as unknown as Record<string, unknown>), pref));
};
