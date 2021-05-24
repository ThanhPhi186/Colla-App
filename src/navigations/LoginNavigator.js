import * as React from 'react';

import {createStackNavigator} from '@react-navigation/stack';

import {
  IntroductionCode,
  IntroScreen,
  LoginScreen,
  NameRegister,
  OTPLogin,
  RegisterScreen,
  StartLogin,
} from '../screens';

const Stack = createStackNavigator();
const LoginNavigator = () => {
  const LoginStack = () => {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          gestureEnabled: false,
          animationEnabled: true,
        }}
        initialRouteName="LoginScreen">
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
      </Stack.Navigator>
    );
  };

  const RegisterStack = () => {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          gestureEnabled: false,
          animationEnabled: true,
        }}
        initialRouteName="RegisterScreen">
        <Stack.Screen name={'RegisterScreen'} component={RegisterScreen} />
        <Stack.Screen name={'NameRegister'} component={NameRegister} />

        <Stack.Screen name={'IntroductionCode'} component={IntroductionCode} />
      </Stack.Navigator>
    );
  };

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
        animationEnabled: true,
      }}>
      <Stack.Screen name={'IntroScreen'} component={IntroScreen} />
      <Stack.Screen name={'StartLogin'} component={StartLogin} />
      <Stack.Screen name={'LoginStack'} component={LoginStack} />
      <Stack.Screen name={'RegisterStack'} component={RegisterStack} />
    </Stack.Navigator>
  );
};

export default LoginNavigator;
