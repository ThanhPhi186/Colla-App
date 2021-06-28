import React, {useEffect} from 'react';
import {View} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Colors, Mixin} from '../../styles';
import Modal from 'react-native-modal';
import {useDispatch, useSelector} from 'react-redux';
import {CartRedux} from '../../redux';
import * as RootNavigation from '../../navigations/RootNavigation';
import BottomTabNavigator from '../../navigations/BottomTabNavigator';
import LoginNavigator from '../../navigations/LoginNavigator';
import {Button} from '../../components/molecules';

const RootView = () => {
  const dispatch = useDispatch();
  const isVisibleModal = useSelector(
    state => state.CartReducer.isVisibleModalTypeSales,
  );
  const idToken = useSelector(state => state.AuthenOverallReducer.idToken);
  const userInfo = useSelector(state => state.AuthenOverallReducer.userAuthen);

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
            width: Mixin.device_width * 0.9,
            backgroundColor: Colors.WHITE,
            borderRadius: Mixin.moderateSize(8),
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: Mixin.moderateSize(16),
          }}>
          {!userInfo.member_type === 'member' ? (
            <Button containerStyle={{marginBottom: 0}} title="Hợp tác" />
          ) : (
            <>
              <Button
                title="Bán hàng online"
                onPress={() => {
                  RootNavigation.navigate('ListSalesProduct', {type: 'ONLINE'});
                  dispatch(CartRedux.Actions.handelModalTypeSales(false));
                }}
              />
              <Button
                containerStyle={{marginBottom: 0}}
                title="Bán hàng offline"
                onPress={() => {
                  RootNavigation.navigate('ListSalesProduct', {
                    type: 'OFFLINE',
                  });
                  dispatch(CartRedux.Actions.handelModalTypeSales(false));
                }}
              />
            </>
          )}
        </View>
      </Modal>
    </SafeAreaProvider>
  );
};

export default RootView;
