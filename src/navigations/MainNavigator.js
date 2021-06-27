import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import LoginNavigator from './LoginNavigator';

import BottomTabNavigator from './BottomTabNavigator';
import {useSelector} from 'react-redux';
import {navigationRef} from './RootNavigation';

const MainNavigator = () => {
  const idToken = useSelector(state => state.AuthenOverallReducer.idToken);

  return (
    <NavigationContainer ref={navigationRef}>
      {idToken ? <BottomTabNavigator /> : <LoginNavigator />}
    </NavigationContainer>
  );
};

export default MainNavigator;
