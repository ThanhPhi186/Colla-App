import React, {useEffect} from 'react';
import {Provider as PaperProvider, DefaultTheme} from 'react-native-paper';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import configureStore from './src/config/store/configureStore';
import {RootView} from './src/screens';
import {NavigationContainer} from '@react-navigation/native';

import {Colors} from './src/styles';
import {navigationRef, isReadyRef} from './src/navigations/RootNavigation';
import RNBootSplash from 'react-native-bootsplash';

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
  React.useEffect(() => {
    return () => {
      isReadyRef.current = false;
    };
  }, []);
  useEffect(() => {
    RNBootSplash.hide({duration: 250});
  }, []);

  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <PersistGate persistor={persistor}>
          <NavigationContainer
            ref={navigationRef}
            onReady={() => {
              isReadyRef.current = true;
            }}>
            <RootView />
            {/* <MainNavigator /> */}
            {/* </RootView> */}
          </NavigationContainer>
        </PersistGate>
      </PaperProvider>
    </Provider>
  );
};
export default App;
