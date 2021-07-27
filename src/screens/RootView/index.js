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
import {Const, trans} from '../../utils';
import SimpleToast from 'react-native-simple-toast';
import messaging from '@react-native-firebase/messaging';

const RootView = () => {
  const dispatch = useDispatch();
  const isVisibleModal = useSelector(
    state => state.CartReducer.isVisibleModalTypeSales,
  );
  const idToken = useSelector(state => state.AuthenOverallReducer.idToken);
  const userInfo = useSelector(state => state.AuthenOverallReducer.userAuthen);

  // useEffect(() => {
  //   // Assume a message-notification contains a "type" property in the data payload of the screen to open

  //   messaging().onNotificationOpenedApp(remoteMessage => {
  //     console.log(
  //       'Notification caused app to open from background state:',
  //       remoteMessage.notification,
  //     );
  //     // navigation.navigate(remoteMessage.data.type);
  //   });

  //   // Check whether an initial notification is available
  //   messaging()
  //     .getInitialNotification()
  //     .then(remoteMessage => {
  //       if (remoteMessage) {
  //         console.log(
  //           'Notification caused app to open from quit state:',
  //           remoteMessage.notification,
  //         );
  //         // setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
  //       }
  //       // setLoading(false);
  //     });
  // }, []);

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
                Chức năng này chỉ dành cho đối tác bán hàng của Colla, nếu bạn
                muốn trở thành đối tác của Colla hãy đăng ký!
              </AppText>
              <Button
                containerStyle={{marginBottom: 0}}
                title="Đăng Ký Hợp Tác"
                onPress={agentRequest}
              />
            </>
          ) : (
            <>
              <Button
                title="Bán hàng online"
                onPress={() => {
                  RootNavigation.navigate(trans('sellProduct'), {
                    screen: 'ListSalesProduct',
                    params: {type: 'online'},
                  });
                  dispatch(CartRedux.Actions.handelModalTypeSales(false));
                }}
              />
              <Button
                containerStyle={{marginBottom: 0}}
                title="Bán tại cửa hàng"
                onPress={() => {
                  RootNavigation.navigate(trans('sellProduct'), {
                    screen: 'ListSalesProduct',
                    params: {type: 'offline'},
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
