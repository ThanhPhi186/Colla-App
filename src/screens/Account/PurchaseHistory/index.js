import React from 'react';
import {View} from 'react-native';
import {Appbar} from 'react-native-paper';

import {container} from '../../../styles/GlobalStyles';
import {trans} from '../../../utils';

import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Purchase from './Purchase';
import Import from './Import';

const PurchaseHistory = ({navigation}) => {
  const Tab = createMaterialTopTabNavigator();

  return (
    <View style={container}>
      <Appbar.Header>
        <Appbar.BackAction color="white" onPress={() => navigation.goBack()} />
        <Appbar.Content color="white" title={trans('purchaseHistory')} />
      </Appbar.Header>
      <Tab.Navigator>
        <Tab.Screen name={trans('purchase')} component={Purchase} />
        <Tab.Screen name={trans('import')} component={Import} />
      </Tab.Navigator>
    </View>
  );
};

export default PurchaseHistory;
