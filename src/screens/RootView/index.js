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
import {AppText} from '../../components/atoms';
import {post} from '../../services/ServiceHandle';
import {Const} from '../../utils';
import SimpleToast from 'react-native-simple-toast';

const RootView = () => {
  const dispatch = useDispatch();
  const isVisibleModal = useSelector(
    state => state.CartReducer.isVisibleModalTypeSales,
  );
  const idToken = useSelector(state => state.AuthenOverallReducer.idToken);
  const userInfo = useSelector(state => state.AuthenOverallReducer.userAuthen);

  const agentRequest = () => {
    const params = {member_type: 'agency'};
    post(Const.API.baseURL + Const.API.AgencyRequest, params).then(res => {
      if (res.ok) {
        dispatch(CartRedux.Actions.handelModalTypeSales(false));
        setTimeout(() => {
          SimpleToast.show(
            'Chúc mừng bạn đã đăng ký thành công. Đội ngũ của Colla sẽ liên hệ với bạn sớm nhất',
            SimpleToast.SHORT,
          );
        }, 700);
      } else {
        dispatch(CartRedux.Actions.handelModalTypeSales(false));
        setTimeout(() => {
          SimpleToast.show(res.error, SimpleToast.SHORT);
        }, 700);
      }
    });
  };

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
          {userInfo.member_type === 'member' ? (
            <>
              <AppText
                style={{
                  textAlign: 'center',
                  marginBottom: 16,
                  paddingHorizontal: 16,
                  fontSize: 16,
                }}>
                Colla liên tục tuyển cộng tác viên bán hàng. Bạn có muốn trở
                thành cộng tác viên không?
              </AppText>
              <Button
                containerStyle={{marginBottom: 0}}
                title="Hợp tác"
                onPress={agentRequest}
              />
            </>
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
