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
  HistoryPoint,
  ReportScreen,
  NotificationScreen,
  PromotionScreen,
  TopSales,
  Policy,
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
      routeName === 'AddNewAddress' ||
      routeName === 'NotificationScreen' ||
      routeName === 'TopSales' ||
      routeName === 'PromotionScreen'
    ) {
      return false;
    }
    return true;
  };

  const getPersonVisibility = route => {
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'MainAccount';

    if (
      routeName === 'HistoryOrder' ||
      routeName === 'ListCustomer' ||
      routeName === 'HistoryPoint' ||
      routeName === 'ReportScreen' ||
      routeName === 'PromotionScreen' ||
      routeName === 'Policy'
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
        initialRouteName="AddNewAddress">
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
        <Stack.Screen
          name="NotificationScreen"
          component={NotificationScreen}
        />
        <Stack.Screen name="TopSales" component={TopSales} />
        <Stack.Screen name="PromotionScreen" component={PromotionScreen} />
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
        <Stack.Screen name="HistoryPoint" component={HistoryPoint} />
        <Stack.Screen name="ReportScreen" component={ReportScreen} />
        <Stack.Screen name="PromotionScreen" component={PromotionScreen} />
        <Stack.Screen name="Policy" component={Policy} />
      </Stack.Navigator>
    );
  };

  return (
    <Tab.Navigator initialRouteName={trans('home')}>
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
        name={trans('contact')}
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
        options={({route}) => ({
          tabBarVisible: getPersonVisibility(route),
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        })}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
