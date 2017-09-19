import { AsyncStorage } from 'react-native';

export default {
  active: true,
  reducerVersion: '1',
  storeConfig: {
    storage: AsyncStorage,
    blacklist: ['signIn'],
  }
};
