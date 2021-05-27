import * as React from 'react';

import {createStackNavigator} from '@react-navigation/stack';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  ContactScreen,
  HomeScreen,
  ListProduct,
  MainAccount,
  ShareScreen,
  DetailProduct,
  CartScreen,
  PaymentScreen,
  DeliveryAddressScreen,
  AddNewAddress,
  HistoryOrder,
  ListCustomer,
} from '../screens';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {CustomButtonTab} from '../components/molecules';
import {trans} from '../utils';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const BottomTabNavigator = () => {
  const getTabBarVisibility = route => {
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'HomeScreen';

    if (
      routeName === 'ListProduct' ||
      routeName === 'DetailProduct' ||
      routeName === 'CartScreen' ||
      routeName === 'PaymentScreen' ||
      routeName === 'DeliveryAddressScreen' ||
      routeName === 'AddNewAddress'
    ) {
      return false;
    }
    return true;
  };

  const HomeStack = () => {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          gestureEnabled: false,
          animationEnabled: true,
        }}
        initialRouteName="HomeScreen">
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="ListProduct" component={ListProduct} />
        <Stack.Screen name="DetailProduct" component={DetailProduct} />
        <Stack.Screen name="CartScreen" component={CartScreen} />
        <Stack.Screen name="PaymentScreen" component={PaymentScreen} />
        <Stack.Screen
          name="DeliveryAddressScreen"
          component={DeliveryAddressScreen}
        />

        <Stack.Screen name="AddNewAddress" component={AddNewAddress} />
      </Stack.Navigator>
    );
  };

  const AccountStack = () => {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          gestureEnabled: false,
          animationEnabled: true,
        }}
        initialRouteName="MainAccount">
        <Stack.Screen name="MainAccount" component={MainAccount} />
        <Stack.Screen name="HistoryOrder" component={HistoryOrder} />
        <Stack.Screen name="ListCustomer" component={ListCustomer} />
      </Stack.Navigator>
    );
  };

  return (
    <Tab.Navigator initialRouteName={trans('personal')}>
      <Tab.Screen
        name={trans('home')}
        component={HomeStack}
        options={({route}) => ({
          tabBarVisible: getTabBarVisibility(route),
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        })}
      />
      <Tab.Screen
        name={trans('help')}
        component={ContactScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons
              name="phone-in-talk"
              color={color}
              size={size}
            />
          ),
        }}
      />
      {/* <Tab.Screen
        name="Middle"
        component={HomeScreen}
        options={{
          tabBarButton: props => <CustomButtonTab {...props} />,
        }}
      /> */}
      <Tab.Screen
        name={trans('share')}
        options={{
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons
              name="share-variant"
              color={color}
              size={size}
            />
          ),
        }}
        component={ShareScreen}
      />
      <Tab.Screen
        name={trans('personal')}
        component={AccountStack}
        options={{
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
