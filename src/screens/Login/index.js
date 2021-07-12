import React, {useEffect, useState} from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {Appbar} from 'react-native-paper';
import {images} from '../../assets';
import {AppImage, AppLoading, AppText} from '../../components/atoms';
import {Button} from '../../components/molecules';
import AppInput from '../../components/molecules/AppInput';
import {container} from '../../styles/GlobalStyles';
import {Const, trans} from '../../utils';
import styles from './styles';
import SimpleToast from 'react-native-simple-toast';
import {post} from '../../services/ServiceHandle';
import {useDispatch} from 'react-redux';
import {AuthenOverallRedux} from '../../redux';
import messaging from '@react-native-firebase/messaging';

const LoginScreen = ({navigation}) => {
  const [phoneNumber, setPhoneNumber] = useState('');

  const [loading, setLoading] = useState(false);

  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  // useEffect(() => {
  //   const currentToken = async () => {
  //     try {
  //       const fcmToken = await messaging().getToken();

  //       if (fcmToken) {
  //         // user has a device token
  //         return Promise.resolve(fcmToken);
  //       }
  //     } catch (error) {
  //       SimpleToast.show(error, SimpleToast.SHORT);
  //     }
  //   };
  //   currentToken();
  // }, []);

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

  const login = () => {
    if (handelCheckValue()) {
      return;
    }
    setLoading(true);

    const convertPhone = `+84${Number(phoneNumber)}`;
    const params = {
      username: convertPhone,
      password: password,
    };
    post(Const.API.baseURL + Const.API.SignIn, params).then(res => {
      if (res.ok) {
        dispatch(
          AuthenOverallRedux.Actions.setToken(res.data.data.access_token),
        );
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
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={container}>
        <AppLoading isVisible={loading} />
        <Appbar.Header>
          <Appbar.BackAction
            color="white"
            onPress={() => navigation.goBack()}
          />
          <Appbar.Content color="white" title={trans('login')} />
        </Appbar.Header>
        <View style={styles.viewContent}>
          <View style={styles.viewLogo}>
            <AppImage source={images.logoTransparent} imageStyle={styles.img} />
          </View>
          <View style={styles.viewText}>
            <AppText title style={styles.textHello}>
              Xin chào!
            </AppText>
            <AppText>Xin vui lòng đăng nhập bằng số điện thoại của bạn</AppText>
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
            <AppInput
              type="password"
              value={password}
              onChangeText={setPassword}
              placeholder="Mật khẩu"
            />
            <TouchableOpacity
              onPress={() => navigation.navigate('ForgotPassword')}>
              <AppText
                containerStyle={styles.viewForgotPass}
                style={styles.txtForgot}>
                {trans('forgotPassword')} ?
              </AppText>
            </TouchableOpacity>
          </View>
        </View>
        <Button
          containerStyle={styles.btnContinue}
          title={trans('continue').toUpperCase()}
          onPress={login}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default LoginScreen;
