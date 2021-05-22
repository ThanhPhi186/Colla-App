import React, {useEffect} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {CustomButtonTab} from '../components/molecules';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {ContactScreen, HomeScreen, MainAccount, ShareScreen} from '../screens';
import LoginNavigator from './LoginNavigator';
import RegisterNavigator from './RegisterNavigator';
import BottomTabNavigator from './BottomTabNavigator';
import {useSelector} from 'react-redux';

const MainNavigator = () => {
  const idToken = useSelector(state => state.AuthenOverallReducer.idToken);

  return (
    <NavigationContainer>
      {idToken ? <BottomTabNavigator /> : <LoginNavigator />}
      {/* <BottomTabNavigator /> */}
    </NavigationContainer>
  );
};

export default MainNavigator;
