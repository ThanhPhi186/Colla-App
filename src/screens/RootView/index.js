import React, {useEffect} from 'react';
import {TouchableOpacity, View} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {Colors, Mixin} from '../../styles';
import ChooseTypeSales from '../ChooseTypeSales';
import MainNavigator from '../../navigations/MainNavigator';
import Modal from 'react-native-modal';
import {AppText} from '../../components/atoms';
import {useDispatch, useSelector} from 'react-redux';
import {CartRedux} from '../../redux';

import * as RootNavigation from '../../navigations/RootNavigation';
import BottomTabNavigator from '../../navigations/BottomTabNavigator';
import LoginNavigator from '../../navigations/LoginNavigator';

const RootView = props => {
  const dispatch = useDispatch();
  const isVisibleModal = useSelector(
    state => state.CartReducer.isVisibleModalTypeSales,
  );
  const idToken = useSelector(state => state.AuthenOverallReducer.idToken);

  return (
    <SafeAreaProvider>
      {idToken ? <BottomTabNavigator /> : <LoginNavigator />}

      <Modal
        isVisible={isVisibleModal}
        onBackdropPress={() =>
          dispatch(CartRedux.Actions.handelModalTypeSales(false))
        }>
        <View
          style={{
            height: Mixin.device_height * 0.18,
            width: Mixin.device_width * 0.9,
            backgroundColor: Colors.WHITE,
            borderRadius: Mixin.moderateSize(8),
            justifyContent: 'space-between',
            ...Mixin.padding(16, 16, 8, 16),
          }}>
          <TouchableOpacity
            onPress={() => {
              RootNavigation.navigate('ListProduct');
              dispatch(CartRedux.Actions.handelModalTypeSales(false));
            }}>
            <AppText>NAVI</AppText>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              dispatch(CartRedux.Actions.handelModalTypeSales(false))
            }>
            <AppText>OFF</AppText>
          </TouchableOpacity>
        </View>
      </Modal>
    </SafeAreaProvider>
  );
};

export default RootView;
