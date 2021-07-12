import React from 'react';
import {View} from 'react-native';
import {Appbar} from 'react-native-paper';
import {container} from '../../../styles/GlobalStyles';
import {trans} from '../../../utils';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import SalesOnlineHistory from './SalesOnlineHistory';
import SalesOfflineHistory from './SalesOfflineHistory';

const SalesHistory = ({navigation, route}) => {
  const {type} = route.params;
  console.log('type', type);
  const Tab = createMaterialTopTabNavigator();

  return (
    <View style={container}>
      <Appbar.Header>
        <Appbar.BackAction color="white" onPress={() => navigation.goBack()} />
        <Appbar.Content color="white" title={trans('salesHistory')} />
      </Appbar.Header>
      <Tab.Navigator initialRouteName={type}>
        <Tab.Screen name="ONLINE" component={SalesOnlineHistory} />
        <Tab.Screen name="OFFLINE" component={SalesOfflineHistory} />
      </Tab.Navigator>
    </View>
  );
};

export default SalesHistory;
