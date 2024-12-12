/**
 * @format
 */

import React from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import App from './App'; // Adjust the import paths as necessary
import { name as appName } from './app.json';
import configureStore from './src/store/ configureStore';

const { store, persistor } = configureStore();

const Main = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);

AppRegistry.registerComponent(appName, () => Main);
