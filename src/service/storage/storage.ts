import browser, { Storage } from 'webextension-polyfill';
import { getDefaultPref } from '../../preference/default';
import { Pref, PrefKeys, PrefPick } from '../../preference/types/lastest';
import { safeUpgradePref, validatePref } from '../../preference/upgrade';
import { BROWSER_TYPE } from '../types';

type StorageAreaName = Exclude<keyof Storage.Static, 'onChanged'>;
type StorageChanges = Partial<{ [P in PrefKeys]: Storage.StorageChange }>;
type StorageListener<A extends StorageAreaName> = (store: StorageChanges, areaName: A) => void;

const updatePrefTime = (pref: Partial<Pref>): Partial<Pref> => ({ ...pref, meta: { update: Date.now() } });

export const getStorage = <T extends PrefKeys>(
  keys?: T,
): Promise<typeof keys extends undefined ? Pref : PrefPick<T>> => {
  return browser.storage.local.get(keys) as any;
};

export const setStorage = (data: Partial<Pref>): Promise<void> => browser.storage.local.set(updatePrefTime(data));

/**
 * reset pref, if undefined or null given, reset to default pref
 */
export const resetStorage = (pref?: Pref) => {
  return browser.storage.local.clear().then(() => browser.storage.local.set(pref || getDefaultPref()));
};

export const listenStorage = <PKey extends PrefKeys, AreaName extends StorageAreaName>(
  listener: StorageListener<AreaName>,
  opt: Partial<{ keys: PKey[]; areaName: AreaName[] }> = {},
): (() => void) => {
  const wrapper = (changes: StorageChanges, areaName: StorageAreaName) => {
    opt.areaName && !opt.areaName.includes(areaName as any)
      ? null
      : !Array.isArray(opt.keys)
        ? listener(changes, areaName as any)
        : Object.keys(changes).some(key => opt.keys?.includes(key as PKey))
          ? listener(changes, areaName as any)
          : null;
  };

  browser.storage.onChanged.addListener(wrapper as any);
  return () => browser.storage.onChanged.removeListener(wrapper as any);
};

export const initialStorage = async (): Promise<Pref> => {
  return browser.storage.local
    .get()
    .then(validatePref(BROWSER_TYPE))
    .then(async holder => (holder.invalid && (await browser.storage.local.clear()), holder.value()))
    .then(pref => safeUpgradePref(BROWSER_TYPE, pref))
    .then(async pref => (await browser.storage.local.set(pref), pref));
};
