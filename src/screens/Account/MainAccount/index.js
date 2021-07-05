import React from 'react';
import {ScrollView, TouchableOpacity, View} from 'react-native';
import {Appbar} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {AppText} from '../../../components/atoms';
import {Button} from '../../../components/molecules';
import {AuthenOverallRedux} from '../../../redux';
import {setToken} from '../../../services/ServiceHandle';
import {
  container,
  HEIGHT_MIDDLE_HOME_BTN,
  NAVIGATION_BOTTOM_TABS_HEIGHT,
} from '../../../styles/GlobalStyles';
import {Const, trans} from '../../../utils';
import auth from '@react-native-firebase/auth';
import {Colors, Mixin} from '../../../styles';
import {device_height, device_width} from '../../../styles/Mixin';
import FastImage from 'react-native-fast-image';
import ItemAccount from '../component/ItemAccount';
import BannerBehind from '../component/BannerBehind';
import {images} from '../../../assets';

const MainAccount = ({navigation}) => {
  const dispatch = useDispatch();

  const userInfo = useSelector(state => state.AuthenOverallReducer.userAuthen);

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
            ? {uri: Const.API.baseURL + userInfo.avatar}
            : images.avatar
        }
        goAccountDetail={() => navigation.navigate('AccountDetail')}
      />
      <View style={styles.viewInfo}>
        <AppText title style={styles.txtName}>
          {userInfo.fullname}
        </AppText>
        <AppText style={styles.txtInfo}>{userInfo.username}</AppText>
        <AppText style={styles.txtInfo}>{userInfo.member_type}</AppText>
      </View>
      <View style={{flex: 1}}>
        <View style={styles.largeIndicate} />
        <ItemAccount point={userInfo.point} />
        <View style={styles.largeIndicate} />
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom:
              NAVIGATION_BOTTOM_TABS_HEIGHT + HEIGHT_MIDDLE_HOME_BTN,
          }}>
          <ItemAccount
            icon="cart-arrow-down"
            title="Nhập hàng"
            onPress={() => navigation.navigate('ListImportProduct')}
          />
          <View style={styles.smallIndicate} />
          <ItemAccount
            icon="file"
            title="Lịch sử tích điểm"
            onPress={() => navigation.navigate('HistoryPoint')}
          />
          <View style={styles.smallIndicate} />
          <ItemAccount
            icon="hand-heart"
            title="Doanh số bán hàng"
            onPress={() => navigation.navigate('ReportScreen')}
          />
          <View style={styles.smallIndicate} />
          <ItemAccount
            icon="clock-outline"
            title="Lịch sử nhập hàng"
            onPress={() => navigation.navigate('ImportHistory')}
          />
          <ItemAccount
            icon="clock-outline"
            title="Lịch sử bán hàng"
            onPress={() =>
              navigation.navigate('SalesHistory', {type: 'SALES_ONLINE'})
            }
          />
          <View style={styles.smallIndicate} />
          <ItemAccount
            icon="gift-outline"
            title="Ưu đãi của tôi"
            onPress={() => navigation.navigate('PromotionScreen')}
          />
          <View style={styles.smallIndicate} />
          <ItemAccount
            icon="card-account-details-outline"
            title="Danh sách Khách Hàng"
            onPress={() => navigation.navigate('ListCustomer')}
          />
          <View style={styles.smallIndicate} />
          <ItemAccount
            icon="message-reply-text"
            title="Chính sách Đại Lý"
            onPress={() => navigation.navigate('Policy')}
          />
          <View style={styles.smallIndicate} />
          <ItemAccount icon="logout" title="Đăng xuất" onPress={logout} />
        </ScrollView>
      </View>
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
