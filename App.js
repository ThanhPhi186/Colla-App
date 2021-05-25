import React, {useEffect} from 'react';
import {Provider as PaperProvider, DefaultTheme} from 'react-native-paper';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import configureStore from './src/config/store/configureStore';
import MainNavigator from './src/navigations/MainNavigator';
import {RootView} from './src/screens';

import {Colors} from './src/styles';

const {persistor, store} = configureStore();
// persistor.purge();
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: Colors.PRIMARY,
    text: Colors.BLACK,
  },
};

const App = () => {
  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <PersistGate persistor={persistor}>
          <RootView>
            <MainNavigator />
          </RootView>
        </PersistGate>
      </PaperProvider>
    </Provider>
  );
};
export default App;
