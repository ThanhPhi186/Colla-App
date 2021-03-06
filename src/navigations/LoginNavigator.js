import * as React from 'react';

import {createStackNavigator} from '@react-navigation/stack';

import {
  LoginIntroductionCode,
  IntroductionCode,
  LoginScreen,
  NameRegister,
  RegisterScreen,
  StartLogin,
  ForgotPassword,
  IntroScreen,
} from '../screens';

const Stack = createStackNavigator();
const LoginNavigator = () => {
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
      <Stack.Screen name="IntroScreen" component={IntroScreen} />
      <Stack.Screen name="StartLogin" component={StartLogin} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="LoginIntroductionCode" component={LoginIntroductionCode} />
      <Stack.Screen name="RegisterStack" component={RegisterStack} />
    </Stack.Navigator>
  );
};

export default LoginNavigator;
