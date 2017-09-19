import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import {persistStore, autoRehydrate } from 'redux-persist';
import { rehydrateStore } from '../helpers/RehydrationHelper';
import reducer from './modules/reducer';
import {AsyncStorage} from 'react-native'


const middleware = [];

// Don't ship these
if (__DEV__) {
  middleware.push(createLogger());
}

// a function which can create our store and auto-persist the data
export default (apiClient) => {
  middleware.push(thunk.withExtraArgument(apiClient));

  // const enhancers = compose(
  //   Reactotron.storeEnhancer(),
  //   applyMiddleware(...middleware),
  //   autoRehydrate()
  // );

  const store = createStore(
    reducer,
    applyMiddleware(thunk),
    autoRehydrate()
  );

  //persistStore(store);
  //rehydrateStore(store);
  persistStore(store, { storage: AsyncStorage }).purge();

  return store;
};
