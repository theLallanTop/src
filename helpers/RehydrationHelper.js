import ReduxPersist from '../config/reduxPersist';
import { AsyncStorage } from 'react-native';
import { persistStore } from 'redux-persist';

export function rehydrateStore(store) {
  const reducerVersion = ReduxPersist.reducerVersion;
  const config = ReduxPersist.storeConfig;

  // Begin a fresh store
  persistStore(store, config);

  // Check to ensure latest reducer version
  AsyncStorage.getItem('reducerVersion').then((localVersion) => {
    if (localVersion !== reducerVersion) {
      console.info('PURGING STORE', localVersion, 'vs.', reducerVersion);
      // Purge store and refresh
      persistStore(store, config, () => {
        // Start a fresh store
        persistStore(store, config);
      }).purgeAll();
      // Update reducer to current version number
      AsyncStorage.setItem('reducerVersion', reducerVersion);
    }
  }).catch(() => AsyncStorage.setItem('reducerVersion', reducerVersion));
}
