import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import LoginNavigator from './LoginNavigator';

import BottomTabNavigator from './BottomTabNavigator';
import {useSelector} from 'react-redux';

const MainNavigator = () => {
  const idToken = useSelector(state => state.AuthenOverallReducer.idToken);

  return (
    <NavigationContainer>
      {idToken ? <BottomTabNavigator /> : <LoginNavigator />}
    </NavigationContainer>
  );
};

export default MainNavigator;
