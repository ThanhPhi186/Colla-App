import React, { useState } from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { Appbar } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { AppText } from '../../../components/atoms';
import { AppDialog, Button } from '../../../components/molecules';
import { AuthenOverallRedux, AppConfigRedux, NotificationRedux } from '../../../redux';
import { setToken } from '../../../services/ServiceHandle';
import {
  container,
  HEIGHT_MIDDLE_HOME_BTN,
  NAVIGATION_BOTTOM_TABS_HEIGHT,
} from '../../../styles/GlobalStyles';
import { Const, trans } from '../../../utils';
import auth from '@react-native-firebase/auth';
import { Colors, Mixin } from '../../../styles';
import { device_height, device_width } from '../../../styles/Mixin';
import FastImage from 'react-native-fast-image';
import ItemAccount from '../component/ItemAccount';
import BannerBehind from '../component/BannerBehind';
import { images } from '../../../assets';
import numeral from 'numeral';
import {useFocusEffect} from '@react-navigation/native';

const MainAccount = ({ navigation }) => {
  useFocusEffect(
    React.useCallback(() => {
      const unsubscribe = () => {
        dispatch(AppConfigRedux.Actions.getAppConfig.request());
        dispatch(NotificationRedux.Actions.getCountNotiUnread.request());
        dispatch(AuthenOverallRedux.Actions.updatePoint.request());
      };

      return () => unsubscribe();
    }, [])
  );

  const dispatch = useDispatch();

  const userInfo = useSelector(state => state.AuthenOverallReducer.userAuthen);

  const [modalLogout, setModalLogout] = useState(false);

  const logout = () => {
    // auth()
    //   .signOut()
    //   .then(
    //     function () {
    //       console.log('Signed Out');
    //     },
    //     function (error) {
    //       console.error('Sign Out Error', error);
    //     },
    //   );
    dispatch(AuthenOverallRedux.Actions.setToken(''));
  };

  return (
    <View style={styles.container}>
      <BannerBehind
        backGround={images.ic_Background}
        avatar={
          userInfo.avatar
            ? { uri: Const.API.baseUrlImage + userInfo.avatar }
            : images.avatar
        }
        goAccountDetail={() => navigation.navigate('AccountDetail')}
      />
      <View style={styles.viewInfo}>
        <AppText title style={styles.txtName}>
          {userInfo.fullname}
        </AppText>
        <AppText style={styles.txtInfo}>{userInfo.username}</AppText>
        <AppText style={styles.txtInfo}>{
          userInfo.member_type == 'member' ? 'Kh??ch h??ng' : (
            userInfo.member_type == 'collaborator' ? 'C???ng t??c vi??n' : (
              userInfo.member_type == 'agency' ? '?????i l??' : (
                userInfo.member_type == 'gold-agency' ? '?????i l?? Gold' : ''
              )
            )
          )}</AppText>
      </View>
      <View style={{ flex: 1 }}>
        <View style={styles.largeIndicate} />
        <ItemAccount point={numeral(userInfo.point).format()} />
        <View style={styles.largeIndicate} />
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom:
              NAVIGATION_BOTTOM_TABS_HEIGHT + HEIGHT_MIDDLE_HOME_BTN,
          }}>
          {userInfo.member_type !== 'member' && (
            <ItemAccount
              icon="cart-arrow-down"
              title="Nh???p h??ng"
              onPress={() => navigation.navigate('ListImportProduct')}
            />
          )}
          <View style={styles.smallIndicate} />
          <ItemAccount
            icon="file"
            title="L???ch s??? t??ch ??i???m"
            onPress={() => navigation.navigate('HistoryPoint')}
          />
          <View style={styles.smallIndicate} />
          <ItemAccount
            icon="hand-heart"
            title="Doanh s??? b??n h??ng"
            onPress={() => navigation.navigate('ReportScreen')}
          />
          <ItemAccount
            icon="hand-heart"
            title="N???p ti???n"
            onPress={() => navigation.navigate('Recharge')}
          />
          <ItemAccount
            icon="hand-heart"
            title="R??t ti???n"
            onPress={() => navigation.navigate('Withdrawal')}
          />
          <View style={styles.smallIndicate} />
          <ItemAccount
            icon="clock-outline"
            title="L???ch s??? mua h??ng"
            onPress={() => navigation.navigate('PurchaseHistory')}
          />
          <ItemAccount
            icon="clock-outline"
            title="L???ch s??? b??n h??ng"
            onPress={() =>
              navigation.navigate('SalesHistory', { type: 'online' })
            }
          />
          <View style={styles.smallIndicate} />
          {/* <ItemAccount
            icon="gift-outline"
            title="??u ????i c???a t??i"
            onPress={() => navigation.navigate('PromotionScreen')}
          /> */}
          {/* <View style={styles.smallIndicate} /> */}
          <ItemAccount
            icon="card-account-details-outline"
            title="Danh s??ch Kh??ch H??ng"
            onPress={() => navigation.navigate('ListCustomer')}
          />
          <View style={styles.smallIndicate} />
          {/* <ItemAccount
            icon="message-reply-text"
            title="Ch??nh s??ch ?????i L??"
            onPress={() => navigation.navigate('Policy')}
          /> */}
          {/* <View style={styles.smallIndicate} /> */}
          <ItemAccount
            icon="logout"
            title="????ng xu???t"
            onPress={() => setModalLogout(true)}
          />
        </ScrollView>
      </View>
      <AppDialog
        content={trans('confirmLogout')}
        isVisible={modalLogout}
        onPressClose={() => setModalLogout(false)}
        onPressConfirm={logout}
      />
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  background: {
    backgroundColor: Colors.PRIMARY,
    width: '100%',
    aspectRatio: 3.5 / 1,
  },
  avatArea: {
    // width: '100%',
    // aspectRatio: 2.5 / 1,
    position: 'absolute',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: device_height / 8,
    alignSelf: 'center',
  },
  image: {
    width: device_width / 3.2,
    aspectRatio: 1 / 1,
    borderRadius: 100,
    alignSelf: 'center',
    position: 'absolute',
    top: device_height / 8,
    // marginTop: height/8,
  },
  areaButtonLogin: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    borderBottomWidth: 7,
    borderBottomColor: Colors.WHITE_SMOKE,
    alignItems: 'flex-end',
    paddingBottom: 10,
    alignSelf: 'center',
    paddingHorizontal: 20,
  },
  areaName: {
    width: '100%',
    height: 50,
    borderBottomWidth: 7,
    borderBottomColor: Colors.WHITE_SMOKE,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'red'
  },
  buttonLogin: {
    borderRadius: 25,
    borderWidth: 1,
    borderColor: Colors.PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
    width: '35%',
    height: 40,
  },
  textButtonLogin: {
    fontSize: 17,
    color: Colors.PRIMARY,
  },
  buttonRegister: {
    borderRadius: 25,
    borderWidth: 1,
    borderColor: Colors.bgRegister,
    justifyContent: 'center',
    alignItems: 'center',
    width: '35%',
    height: 40,
  },
  textButtonRegister: {
    fontSize: 17,
    color: Colors.bgRegister,
  },
  largeIndicate: {
    width: '100%',
    height: 7,
    backgroundColor: Colors.WHITE_SMOKE,
  },
  smallIndicate: {
    width: '100%',
    height: 1,
    backgroundColor: Colors.WHITE_SMOKE,
  },
  textName: {
    fontSize: 17,
    fontWeight: '500',
  },
  box: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingLeft: 15,
    paddingRight: 15,
    alignItems: 'center',
    height: 50,
  },
  boxLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconLeft: {
    width: 20,
    height: 20,
    marginTop: 10,
    marginBottom: 10,
    marginRight: 10,
  },
  titleRight: {
    fontSize: 17,

    fontWeight: '400',
  },
  picker: {
    height: 50,
    width: 145,
  },
  txtName: {
    fontWeight: 'bold',
  },
  viewInfo: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Mixin.moderateSize(8),
    paddingBottom: Mixin.moderateSize(8),
  },
  txtInfo: {
    marginTop: Mixin.moderateSize(4),
  },
};

export default MainAccount;
