import { listenStorage } from '../../service/storage/storage';
import { bgLog } from '../logger';
import { bgHandlePrefUpdate } from './storage';

export function mountPrefListener() {
  listenStorage(
    changes => {
      bgLog('[BG_RECEIVE_SYNC_PREF_CHANGE]', changes);
      bgHandlePrefUpdate(changes);
    },
    { areaName: ['local'] },
  );
}
