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
  PurchaseHistory,
  SalesHistory,
  Recharge,
  Withdrawal,
  ListBlog,
  AddCustomerOffLine,
  DetailBlog,
  DetailNotification,
} from '../screens';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {CustomButtonTab} from '../components/molecules';
import {trans} from '../utils';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {CartRedux} from '../redux';
import {isIphoneX} from '../helpers/iphoneXHelper';
import {device_width} from '../styles/Mixin';
import {Text, TouchableOpacity, View} from 'react-native';
import TabShape from './TabShape';
import {Colors} from '../styles';
import {FONT_SIZE_10} from '../styles/Typography';
import {NAVIGATION_BOTTOM_TABS_HEIGHT} from '../styles/GlobalStyles';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const BottomTabNavigator = () => {
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
      routeName === 'ListBlog' ||
      routeName === 'Recharge' ||
      routeName === 'DetailBlog' ||
      routeName === 'DetailNotification'
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
      routeName === 'PurchaseHistory' ||
      routeName === 'SalesHistory' ||
      routeName === 'Recharge' ||
      routeName === 'Withdrawal' ||
      routeName === 'PaymentScreen'
    ) {
      return false;
    }
    return true;
  };

  const getSalesProductVisibility = route => {
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'ListSalesProduct';
    if (
      routeName === 'ListSalesProduct' ||
      routeName === 'SalesCart' ||
      routeName === 'PaymentOfSales' ||
      routeName === 'ListSalesCustomer' ||
      routeName === 'AddNewCustomer' ||
      routeName === 'AddCustomerOffLine'
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
        <Stack.Screen name="ListBlog" component={ListBlog} />
        <Stack.Screen name="Recharge" component={Recharge} />
        <Stack.Screen name="DetailBlog" component={DetailBlog} />
        <Stack.Screen
          name="DetailNotification"
          component={DetailNotification}
        />
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
        <Stack.Screen name="PurchaseHistory" component={PurchaseHistory} />
        <Stack.Screen name="SalesHistory" component={SalesHistory} />
        <Stack.Screen name="ListCustomer" component={ListCustomer} />
        <Stack.Screen name="HistoryPoint" component={HistoryPoint} />
        <Stack.Screen name="ReportScreen" component={ReportScreen} />
        <Stack.Screen name="PromotionScreen" component={PromotionScreen} />
        <Stack.Screen name="Policy" component={Policy} />
        <Stack.Screen name="ListImportProduct" component={ListImportProduct} />
        <Stack.Screen name="ImportCart" component={ImportCart} />
        <Stack.Screen name="Recharge" component={Recharge} />
        <Stack.Screen name="Withdrawal" component={Withdrawal} />
        <Stack.Screen name="PaymentScreen" component={PaymentScreen} />
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
        <Stack.Screen
          name="AddCustomerOffLine"
          component={AddCustomerOffLine}
        />
      </Stack.Navigator>
    );
  };

  function MyTabBar({state, descriptors, navigation}) {
    const focusedOptions = descriptors[state.routes[state.index].key].options;

    const tabWidth = React.useMemo(
      () => device_width / state.routes.length,
      [state.routes.length],
    );

    if (focusedOptions.tabBarVisible === false) {
      return null;
    }
    const renderIcon = name => {
      switch (name) {
        case trans('home'):
          return 'home';
        case trans('contact'):
          return 'phone-in-talk';
        case 'Lên đơn':
          return 'plus-circle-outline';
        case trans('share'):
          return 'share-variant';
        case trans('personal'):
          return 'account';
        default:
          break;
      }
    };

    return (
      <View style={styles.content}>
        <TabShape {...{tabWidth}} />
        <View style={styles.subContent}>
          {state.routes.map((route, index) => {
            const {options} = descriptors[route.key];

            const label =
              options.tabBarLabel !== undefined
                ? options.tabBarLabel
                : options.title !== undefined
                ? options.title
                : route.name;

            const isFocused = state.index === index;

            const onPress = () => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name);
              }
            };

            const onLongPress = () => {
              navigation.emit({
                type: 'tabLongPress',
                target: route.key,
              });
            };
            if (index === 2) {
              return (
                <CustomButtonTab
                  onPress={() =>
                    dispatch(CartRedux.Actions.handelModalTypeSales(true))
                  }
                  key={index}
                />
              );
            }

            return (
              <TouchableOpacity
                key={index}
                accessibilityRole="button"
                accessibilityState={isFocused ? {selected: true} : {}}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarTestID}
                onPress={onPress}
                onLongPress={onLongPress}
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <MaterialCommunityIcons
                  name={renderIcon(label)}
                  color={isFocused ? Colors.PRIMARY : Colors.GRAY}
                  size={24}
                />
                <Text
                  style={{
                    color: isFocused ? Colors.PRIMARY : Colors.GRAY,
                    marginTop: 8,
                    fontSize: FONT_SIZE_10,
                  }}>
                  {label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    );
  }

  return (
    <Tab.Navigator tabBar={props => <MyTabBar {...props} />}>
      <Tab.Screen
        name={trans('home')}
        component={HomeStack}
        options={({route}) => ({tabBarVisible: getTabBarVisibility(route)})}
      />
      <Tab.Screen name={trans('contact')} component={ContactScreen} />
      <Tab.Screen
        name={trans('sellProduct')}
        component={SalesProductStack}
        options={({route}) => ({
          tabBarVisible: getSalesProductVisibility(route),
        })}
      />
      <Tab.Screen name={trans('share')} component={ShareScreen} />
      <Tab.Screen
        name={trans('personal')}
        component={AccountStack}
        options={({route}) => ({tabBarVisible: getPersonVisibility(route)})}
      />
    </Tab.Navigator>
  );
};

const styles = {
  content: {
    position: 'absolute',
    bottom: 0,
  },
  subContent: {
    flexDirection: 'row',
    position: 'absolute',
    height: NAVIGATION_BOTTOM_TABS_HEIGHT,
    width: device_width,
  },
};

export default BottomTabNavigator;
