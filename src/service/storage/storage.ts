import browser, { Storage } from 'webextension-polyfill';
import { getDefaultPref } from '../../preference/default';
import { Pref, PrefKeys, PrefPick } from '../../preference/types/lastest';
import { safeUpgradePref, validatePref } from '../../preference/upgrade';
import { BROWSER_TYPE } from '../types';

export namespace storage {
  const local = browser.storage.local;
  const onChanged = browser.storage.onChanged;

  // types
  export type StorageAreaName = 'local' | 'managed' | 'sync';
  export type StorageChange = Storage.StorageChange;
  export type StorageChanges = Partial<{ [P in PrefKeys]: storage.StorageChange }>;
  export type StorageListener<A extends StorageAreaName> = (store: StorageChanges, areaName: A) => void;

  // custom
  const updatePrefTime = (pref: Partial<Pref>): Partial<Pref> => ({ ...pref, meta: { update: Date.now() } });

  export const get = <T extends PrefKeys>(keys?: T): Promise<typeof keys extends undefined ? Pref : PrefPick<T>> => {
    return local.get(keys) as any;
  };

  export const set = (data: Partial<Pref>): Promise<void> => local.set(updatePrefTime(data));

  /**
   * reset pref, if undefined or null given, reset to default pref
   */
  export const reset = (pref?: Pref) => local.clear().then(() => local.set(pref || getDefaultPref()));

  export const listen = <PKey extends PrefKeys, AreaName extends StorageAreaName>(
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

    onChanged.addListener(wrapper as any);
    return () => onChanged.removeListener(wrapper as any);
  };

  export const initial = async (): Promise<Pref> => {
    return local
      .get()
      .then(validatePref(BROWSER_TYPE))
      .then(async holder => (holder.invalid && (await local.clear()), holder.value()))
      .then(pref => safeUpgradePref(BROWSER_TYPE, pref))
      .then(async pref => (await local.set(pref), pref));
  };
}
