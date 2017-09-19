import React, { Component, PropTypes } from 'react';
import { AsyncStorage } from 'react-native';
import { Provider } from 'react-redux';
import client from './helpers/ApiClient';
import createStore from './redux/create';
import AppRouter from './routes';

const store = createStore(client);

export default class Root extends Component {

  render() {
      return (
        <Provider store={store}>
          <AppRouter />
        </Provider>
      );
  }
}
