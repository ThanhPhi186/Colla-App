import * as React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import {IntroductionCode, NameRegister, RegisterScreen} from '../screens';

const Stack = createStackNavigator();
const RegisterNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
        animationEnabled: true,
      }}>
      <Stack.Screen name={'RegisterScreen'} component={RegisterScreen} />
      <Stack.Screen name={'NameRegister'} component={NameRegister} />

      <Stack.Screen name={'IntroductionCode'} component={IntroductionCode} />
    </Stack.Navigator>
  );
};

export default RegisterNavigator;
