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
  ListCustomer,
  HistoryPoint,
  ReportScreen,
  NotificationScreen,
  PromotionScreen,
  TopSales,
  Policy,
  ListSalesProduct,
  SalesCart,
  PaymentOfSales,
  ListImportProduct,
  ImportCart,
  AccountDetail,
  ListSalesCustomer,
  AddNewCustomer,
  ImportHistory,
  SalesHistory,
} from '../screens';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {CustomButtonTab} from '../components/molecules';
import {trans} from '../utils';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {CartRedux} from '../redux';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const BottomTabNavigator = props => {
  const dispatch = useDispatch();

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
      routeName === 'PromotionScreen' ||
      routeName === 'ListSalesProduct' ||
      routeName === 'SalesCart' ||
      routeName === 'PaymentOfSales' ||
      routeName === 'ListSalesCustomer' ||
      routeName === 'AddNewCustomer'
    ) {
      return false;
    }
    return true;
  };

  const getPersonVisibility = route => {
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'MainAccount';

    if (
      routeName === 'ListCustomer' ||
      routeName === 'HistoryPoint' ||
      routeName === 'ReportScreen' ||
      routeName === 'PromotionScreen' ||
      routeName === 'Policy' ||
      routeName === 'ListImportProduct' ||
      routeName === 'ImportCart' ||
      routeName === 'AccountDetail' ||
      routeName === 'ImportHistory' ||
      routeName === 'SalesHistory'
    ) {
      return false;
    }
    return true;
  };

  const getSalesProductVisibility = route => {
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'ListSalesProduct';
    if (
      routeName === 'SalesCart' ||
      routeName === 'PaymentOfSales' ||
      routeName === 'ListSalesCustomer' ||
      routeName === 'AddNewCustomer'
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
        <Stack.Screen
          name="NotificationScreen"
          component={NotificationScreen}
        />
        <Stack.Screen name="TopSales" component={TopSales} />
        <Stack.Screen name="PromotionScreen" component={PromotionScreen} />
        <Stack.Screen name="ListSalesProduct" component={ListSalesProduct} />
        <Stack.Screen name="SalesCart" component={SalesCart} />
        <Stack.Screen name="PaymentOfSales" component={PaymentOfSales} />
        <Stack.Screen name="ListSalesCustomer" component={ListSalesCustomer} />
        <Stack.Screen name="AddNewCustomer" component={AddNewCustomer} />
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
        <Stack.Screen name="AccountDetail" component={AccountDetail} />
        <Stack.Screen name="ImportHistory" component={ImportHistory} />
        <Stack.Screen name="SalesHistory" component={SalesHistory} />
        <Stack.Screen name="ListCustomer" component={ListCustomer} />
        <Stack.Screen name="HistoryPoint" component={HistoryPoint} />
        <Stack.Screen name="ReportScreen" component={ReportScreen} />
        <Stack.Screen name="PromotionScreen" component={PromotionScreen} />
        <Stack.Screen name="Policy" component={Policy} />
        <Stack.Screen name="ListImportProduct" component={ListImportProduct} />
        <Stack.Screen name="ImportCart" component={ImportCart} />
      </Stack.Navigator>
    );
  };

  const SalesProductStack = () => {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          gestureEnabled: false,
          animationEnabled: true,
        }}
        initialRouteName="ListSalesProduct">
        <Stack.Screen name="ListSalesProduct" component={ListSalesProduct} />
        <Stack.Screen name="SalesCart" component={SalesCart} />
        <Stack.Screen name="PaymentOfSales" component={PaymentOfSales} />
        <Stack.Screen name="ListSalesCustomer" component={ListSalesCustomer} />
        <Stack.Screen name="AddNewCustomer" component={AddNewCustomer} />
      </Stack.Navigator>
    );
  };

  return (
    <Tab.Navigator
      initialRouteName={trans('home')}
      // tabBar={props => <CustomTabBar />}
    >
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
      <Tab.Screen
        name={trans('sellProduct')}
        component={SalesProductStack}
        options={({route}) => ({
          tabBarVisible: getSalesProductVisibility(route),

          // tabBarIcon: ({color, size}) => (
          //   <MaterialCommunityIcons
          //     name="plus-circle-outline"
          //     color={color}
          //     size={size}
          //   />
          // ),

          tabBarButton: props => (
            <CustomButtonTab
              {...props}
              tabBarVisible={route}
              onPress={() =>
                dispatch(CartRedux.Actions.handelModalTypeSales(true))
              }
            />
          ),
        })}
      />
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
