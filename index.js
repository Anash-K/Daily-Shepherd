/**
 * @format
 */

import React from 'react';
import {AppRegistry} from 'react-native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import App from './App'; // Adjust the import paths as necessary
import {name as appName} from './app.json';
import {Provider as PaperProvider} from 'react-native-paper';
import store, { persistor } from './src/store/configureStore';


const Main = () => (
  <Provider store={store}>
    <PersistGate  persistor={persistor}>
      <PaperProvider>
        <App />
      </PaperProvider>
    </PersistGate>
  </Provider>
);
console.log('App Name:', appName); // Add this to debug
AppRegistry.registerComponent(appName, () => Main);
