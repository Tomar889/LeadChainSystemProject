// /**
//  * @format
//  */

// import {AppRegistry} from 'react-native';
// import App from './App';
// import {name as appName} from './app.json';

// AppRegistry.registerComponent(appName, () => 
    
//     App

// );
import React from 'react';
import { AppRegistry } from 'react-native';
import App from './App';
import { store } from './Component/Redux/Store';
import { Provider } from 'react-redux';
import { name as appName } from './app.json';

const AppWrapper = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

AppRegistry.registerComponent(appName, () => AppWrapper);

