import React, {useState} from 'react';
import {View, TextInput} from 'react-native';
import {Appbar} from 'react-native-paper';
import {images} from '../../../assets';
import {AppImage, AppLoading, AppText} from '../../../components/atoms';
import {Button} from '../../../components/molecules';
import AppInput from '../../../components/molecules/AppInput';
import {container} from '../../../styles/GlobalStyles';
import {Const, trans} from '../../../utils';
import styles from '../styles';
import SimpleToast from 'react-native-simple-toast';
import {useDispatch} from 'react-redux';
import {post} from '../../../services/ServiceHandle';
import {AuthenOverallRedux} from '../../../redux';

const RegisterScreen = ({navigation}) => {
  const [phoneNumber, setPhoneNumber] = useState('');

  const [loading, setLoading] = useState(false);
  const [confirm, setConfirm] = useState(null);

  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const handelCheckValue = () => {
    const regex =
      /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/;
    if (!regex.test(phoneNumber)) {
      SimpleToast.show('Số điện thoại không đúng định dạng', SimpleToast.LONG);
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
    setLoading(true);

    const convertPhone = phoneNumber;
    const params = {
      username: convertPhone,
      password: password,
    };

    post(Const.API.baseURL + Const.API.SignUp, params).then(res => {
      if (res.ok) {
        sendOtp();
      } else {
        setLoading(false);
        setTimeout(() => {
          SimpleToast.show(res.error, SimpleToast.SHORT);
        }, 700);
      }
    });
  };

  const sendOtp = () => {
    const params = {
      phoneNumber: phoneNumber,
    };
    post(Const.API.baseURL + Const.API.SendOtp, params).then(res => {
      if (res.ok) {
        setLoading(false);
        setConfirm('123456');
        setTimeout(() => {
          SimpleToast.show('Gửi mã OTP thành công!', SimpleToast.SHORT);
        }, 700);
      } else {
        setLoading(false);
        setTimeout(() => {
          SimpleToast.show(res.error, SimpleToast.SHORT);
        }, 700);
      }
    });
  };

  const confirmOTP = () => {
    setLoading(true);
    const params = {
      phoneNumber: phoneNumber,
      otp: code,
    };
    post(Const.API.baseURL + Const.API.VerifyOtp, params).then(res => {
      if (res.ok) {
        navigation.navigate('NameRegister', {
          tokenState: res.data.data.access_token,
        });
        dispatch(AuthenOverallRedux.Actions.loginSuccess(res.data.data));
        setLoading(false);
      } else {
        setLoading(false);
        setTimeout(() => {
          SimpleToast.show(res.error, SimpleToast.SHORT);
        }, 700);
      }
    });
  };

  return (
    <View style={container}>
      <AppLoading isVisible={loading} />
      <Appbar.Header>
        <Appbar.BackAction color="white" onPress={() => navigation.goBack()} />
        <Appbar.Content color="white" title={trans('register')} />
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
              <AppText>Vui lòng đăng ký bằng số điện thoại của bạn</AppText>
            </View>
            <View style={styles.viewInput}>
              <AppInput
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                placeholder="Số điện thoại của bạn"
              />
              <AppInput
                type="password"
                value={password}
                onChangeText={setPassword}
                placeholder="Nhập mật khẩu"
              />
            </View>
          </>
        ) : (
          <>
            <View style={styles.viewText}>
              <AppText title style={styles.textHello}>
                Xin chào {phoneNumber}
              </AppText>
              <AppText>
                Vui lòng nhập mã OTP được gửi đến tin nhắn của bạn
              </AppText>
            </View>
            <View style={styles.viewInput}>
              <AppInput
                value={code}
                onChangeText={setCode}
                placeholder="Mã OTP của bạn"
                keyboardType="numeric"
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

export default RegisterScreen;
