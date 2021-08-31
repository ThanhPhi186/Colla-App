import React, {useState} from 'react';
import {View, TextInput} from 'react-native';
import {Appbar} from 'react-native-paper';
import SimpleToast from 'react-native-simple-toast';
import {useDispatch} from 'react-redux';
import {images} from '../../assets';
import {AppImage, AppLoading, AppText} from '../../components/atoms';
import {Button} from '../../components/molecules';
import AppInput from '../../components/molecules/AppInput';
import {post} from '../../services/ServiceHandle';
import {container} from '../../styles/GlobalStyles';
import {Const, trans} from '../../utils';
import styles from './styles';

const ForgotPassword = ({navigation}) => {
  const [phoneNumber, setPhoneNumber] = useState('');

  const [loading, setLoading] = useState(false);
  const [confirm, setConfirm] = useState(null);

  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');

  const handelCheckValue = () => {
    const regex =
      /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/;
    if (!regex.test(phoneNumber)) {
      SimpleToast.show('Số điện thoại không đúng định dạng', SimpleToast.LONG);
      return true;
    }

    return false;
  };

  const handelCheckPass = () => {
    if (!otp) {
      SimpleToast.show('Mã OTP không được để trống', SimpleToast.SHORT);
      return true;
    }
    if (!password) {
      SimpleToast.show('Mật khẩu không được để trống', SimpleToast.SHORT);
      return true;
    }
    if (password.length < 6) {
      SimpleToast.show(
        'Mật khẩu không được nhỏ hơn 6 kí tự',
        SimpleToast.SHORT,
      );
      return true;
    }
    return false;
  };

  const checkPhone = () => {
    if (handelCheckValue()) {
      return;
    }

    const convertPhone = phoneNumber;
    const params = {
      phoneNumber: convertPhone,
    };

    post(Const.API.baseURL + Const.API.ForgotPassword, params).then(res => {
      if (res.ok) {
        setConfirm('123456');
      } else {
        SimpleToast.show(res.error, SimpleToast.SHORT);
      }
    });
  };

  const confirmOTP = () => {
    if (handelCheckPass()) {
      return;
    }
    const params = {
      phoneNumber: phoneNumber,
      otp: otp,
      newPassword: password,
    };
    post(Const.API.baseURL + Const.API.ResetPassword, params).then(res => {
      if (res.ok) {
        SimpleToast.show('Đổi mật khẩu thành công', SimpleToast.SHORT);
        navigation.goBack();
        // dispatch(AuthenOverallRedux.Actions.loginSuccess(res.data.data));
        // navigation.navigate('NameRegister', {
        //   tokenState: res.data.data.access_token,
        // });
        setLoading(false);
      } else {
        setLoading(false);
        SimpleToast.show(res.error, SimpleToast.SHORT);
      }
    });
  };

  return (
    <View style={container}>
      <AppLoading isVisible={loading} />
      <Appbar.Header>
        <Appbar.BackAction color="white" onPress={() => navigation.goBack()} />
        <Appbar.Content color="white" title={trans('forgotPassword')} />
      </Appbar.Header>
      <View style={styles.viewContent}>
        <View style={styles.viewLogo}>
          <AppImage source={images.logoTransparent} imageStyle={styles.img} />
        </View>
        {!confirm ? (
          <>
            <View style={styles.viewText}>
              <AppText title style={styles.textHello}>
                Xin chào!
              </AppText>
              <AppText>Vui lòng nhập số điện thoại bạn đã đăng ký </AppText>
            </View>
            <View style={styles.viewInput}>
              <View style={styles.viewPhone}>
                <TextInput
                  value={phoneNumber}
                  onChangeText={setPhoneNumber}
                  placeholder="Số điện thoại của bạn"
                  keyboardType="numeric"
                />
              </View>
            </View>
          </>
        ) : (
          <>
            <View style={styles.viewText}>
              <AppText title style={styles.textHello}>
                Xin chào {phoneNumber}
              </AppText>
              <AppText>Vui lòng nhập mã OTP và mật khẩu mới của bạn</AppText>
            </View>
            <View style={styles.viewInput}>
              <View style={styles.viewPhone}>
                <TextInput
                  value={otp}
                  onChangeText={setOtp}
                  placeholder="Mã OTP"
                  keyboardType="numeric"
                />
              </View>
              <AppInput
                type="password"
                value={password}
                onChangeText={setPassword}
                placeholder="Mật khẩu mới"
              />
            </View>
          </>
        )}
      </View>
      <Button
        containerStyle={styles.btnContinue}
        title={trans('continue').toUpperCase()}
        onPress={!confirm ? checkPhone : confirmOTP}
      />
    </View>
  );
};

export default ForgotPassword;
