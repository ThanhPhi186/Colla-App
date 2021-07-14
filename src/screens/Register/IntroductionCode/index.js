import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {Appbar} from 'react-native-paper';
import SimpleToast from 'react-native-simple-toast';
import {useDispatch, useSelector} from 'react-redux';
import {images} from '../../../assets';
import {AppImage, AppText} from '../../../components/atoms';
import {Button} from '../../../components/molecules';
import AppInput from '../../../components/molecules/AppInput';
import {AuthenOverallRedux} from '../../../redux';
import {get, post} from '../../../services/ServiceHandle';
import {container} from '../../../styles/GlobalStyles';
import {statusBar} from '../../../styles/Mixin';
import {Const, trans} from '../../../utils';
import styles from '../styles';

const IntroductionCode = ({navigation, route}) => {
  const [phoneNumber, setPhoneNumber] = useState('');

  const {tokenState} = route.params;

  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(AuthenOverallRedux.Actions.getProfile.request());
  // }, []);

  const sendPhoneNumber = () => {
    const regex =
      /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/;

    if (!regex.test(phoneNumber)) {
      return SimpleToast.show(
        'Số điện thoại không đúng định dạng',
        SimpleToast.LONG,
      );
    }
    const params = {
      affiliateFromPhoneNumber: `+84${Number(phoneNumber)}`,
    };
    post(Const.API.baseURL + Const.API.UpdateProfile, params).then(res => {
      if (res.ok) {
        dispatch(AuthenOverallRedux.Actions.setToken(tokenState));
      } else {
        SimpleToast.show(res.error, SimpleToast.SHORT);
      }
    });
  };
  return (
    <View style={container}>
      <Appbar.Header>
        <Appbar.BackAction color="white" onPress={() => navigation.goBack()} />
        <Appbar.Content color="white" title={trans('register')} />
      </Appbar.Header>
      <View style={styles.viewContent}>
        <View style={styles.viewLogo}>
          <AppImage source={images.logoTransparent} imageStyle={styles.img} />
        </View>
        <View style={styles.viewText}>
          <AppText title style={styles.textHello}>
            Tốt lắm !
          </AppText>
          <AppText>Bước cuối cùng để trở thành đại lý của Akini</AppText>
        </View>
        <View style={styles.viewInput}>
          <AppInput
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            placeholder="Sđt người giới thiệu bạn"
            keyboardType="numeric"
          />
          <View style={styles.viewBtnConfirm}>
            <Button
              title={trans('confirm')}
              containerStyle={styles.btnConfirm}
              onPress={sendPhoneNumber}
            />
          </View>
          <AppText style={styles.txtContact}>
            Liên hệ với Akini nếu bạn không có mã giới thiệu
          </AppText>
        </View>
      </View>
      <Button
        containerStyle={styles.btnContinue}
        title={trans('ignore').toUpperCase()}
        onPress={() =>
          dispatch(AuthenOverallRedux.Actions.setToken(tokenState))
        }
      />
    </View>
  );
};

export default IntroductionCode;
