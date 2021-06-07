import * as React from 'react';

import {createStackNavigator} from '@react-navigation/stack';

import {
  CheckPhone,
  IntroductionCode,
  LoginScreen,
  NameRegister,
  NewPassword,
  RegisterScreen,
  StartLogin,
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
  const ForgotPassStack = () => {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          gestureEnabled: false,
          animationEnabled: true,
        }}
        initialRouteName="CheckPhone">
        <Stack.Screen name="CheckPhone" component={CheckPhone} />
        <Stack.Screen name="NewPassword" component={NewPassword} />
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
      {/* <Stack.Screen name={'IntroScreen'} component={IntroScreen} /> */}
      <Stack.Screen name="StartLogin" component={StartLogin} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="ForgotPassStack" component={ForgotPassStack} />
      <Stack.Screen name="RegisterStack" component={RegisterStack} />
    </Stack.Navigator>
  );
};

export default LoginNavigator;
