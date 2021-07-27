import React from 'react';
import {View} from 'react-native';
import {Appbar} from 'react-native-paper';
import {container} from '../../../styles/GlobalStyles';
import {trans} from '../../../utils';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Revenue from './Revenue';
import Inventory from './Inventory';

const ReportScreen = ({navigation}) => {
  const Tab = createMaterialTopTabNavigator();

  const openModalType = () => {};

  return (
    <View style={container}>
      <Appbar.Header>
        <Appbar.BackAction color="white" onPress={() => navigation.goBack()} />
        <Appbar.Content color="white" title={trans('report')} />
      </Appbar.Header>
      {/* <Tab.Navigator>
        <Tab.Screen name={trans('revenue')} component={Revenue} />
        <Tab.Screen name={trans('inventory')} component={Inventory} />
      </Tab.Navigator> */}
      <Revenue />
    </View>
  );
};

export default ReportScreen;
