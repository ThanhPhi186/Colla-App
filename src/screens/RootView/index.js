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

const RootView = props => {
  const dispatch = useDispatch();
  const isVisibleModal = useSelector(
    state => state.CartReducer.isVisibleModalTypeSales,
  );
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

  return (
    <SafeAreaProvider>
      {props.children}

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
          <TouchableOpacity onPress={() => {}}>
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
