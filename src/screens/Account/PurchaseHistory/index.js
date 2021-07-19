import React from 'react';
import {View} from 'react-native';
import {Appbar} from 'react-native-paper';

import {container} from '../../../styles/GlobalStyles';
import {trans} from '../../../utils';

import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Purchase from './Purchase';
import Import from './Import';
import {useSelector} from 'react-redux';

const PurchaseHistory = ({navigation}) => {
  const userInfo = useSelector(state => state.AuthenOverallReducer.userAuthen);
  const Tab = createMaterialTopTabNavigator();

  return (
    <View style={container}>
      <Appbar.Header>
        <Appbar.BackAction color="white" onPress={() => navigation.goBack()} />
        <Appbar.Content color="white" title={trans('purchaseHistory')} />
      </Appbar.Header>

      {userInfo.member_type !== 'member' ? (
        <Tab.Navigator>
          <Tab.Screen name={trans('purchase')} component={Purchase} />
          <Tab.Screen name={trans('import')} component={Import} />
        </Tab.Navigator>
      ) : (
        <Purchase />
      )}
    </View>
  );
};

export default PurchaseHistory;
