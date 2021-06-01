import React, {useEffect, useState} from 'react';
import {TextInput, View} from 'react-native';
import {Appbar} from 'react-native-paper';
import {images} from '../../assets';
import {AppImage, AppLoading, AppText} from '../../components/atoms';
import {Button} from '../../components/molecules';
import AppInput from '../../components/molecules/AppInput';
import {container} from '../../styles/GlobalStyles';
import {Const, trans} from '../../utils';
import styles from './styles';
import SimpleToast from 'react-native-simple-toast';
import {statusBar} from '../../styles/Mixin';
import auth from '@react-native-firebase/auth';
import {get, post} from '../../services/ServiceHandle';
import {useDispatch} from 'react-redux';
import {AuthenOverallRedux} from '../../redux';

const LoginScreen = ({navigation}) => {
  const [phoneNumber, setPhoneNumber] = useState('');

  const [loading, setLoading] = useState(false);

  const [confirm, setConfirm] = useState(null);

  const [code, setCode] = useState('');

  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  // const getOTP = async () => {
  //   try {
  //     const regex =
  //       /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/;
  //     if (!regex.test(phoneNumber)) {
  //       return SimpleToast.show(
  //         'Số điện thoại không đúng định dạng',
  //         SimpleToast.LONG,
  //       );
  //     }
  //     setLoading(true);
  //     const convertPhone = `+84${Number(phoneNumber)}`;
  //     const confirmation = await auth().signInWithPhoneNumber(convertPhone);
  //     if (confirmation) {
  //       setLoading(false);
  //       setConfirm(confirmation);
  //     } else {
  //       setLoading(false);
  //       setTimeout(() => {
  //         SimpleToast.show(confirmation, SimpleToast.SHORT);
  //       }, 500);
  //     }
  //   } catch (error) {
  //     SimpleToast.show(
  //       'Chưa gửi được mã OTP! Vui lòng thử lại sau.',
  //       SimpleToast.LONG,
  //     );
  //     console.log(error);
  //     setLoading(false);
  //   }
  // };

  // const confirmOTP = async () => {
  //   try {
  //     setLoading(true);
  //     const confirmResult = await confirm.confirm(code);
  //     if (confirmResult) {
  //       auth().onAuthStateChanged(user => {
  //         if (user) {
  //           user.getIdToken().then(token => {
  //             post(Const.API.baseURL + Const.API.VerifyPhone, {token}).then(
  //               res => {
  //                 if (res.ok) {
  //                   setLoading(false);
  //                   setToken(res.data.data.access_token);
  //                   dispatch(
  //                     AuthenOverallRedux.Actions.setToken(
  //                       res.data.data.access_token,
  //                     ),
  //                   );
  //                   dispatch(
  //                     AuthenOverallRedux.Actions.loginSuccess(res.data.data),
  //                   );
  //                 } else {
  //                   setLoading(false);
  //                   SimpleToast.show(res.error, SimpleToast.SHORT);
  //                 }
  //               },
  //             );
  //           });
  //         } else {
  //           SimpleToast.show(
  //             'Không lấy được thông tin tài khoản!',
  //             SimpleToast.LONG,
  //           );
  //           setLoading(false);
  //         }
  //       });
  //     }
  //   } catch (error) {
  //     setLoading(false);
  //     console.log('error', error);
  //     SimpleToast.show(error, SimpleToast.LONG);
  //     // SimpleToast.show('Mã OTP không khớp', SimpleToast.LONG);
  //   }
  // };

  // const confirmOTP = async () => {
  //   const params = {
  //     phoneNumber: `+84${Number(phoneNumber)}`,
  //     otp: code,
  //   };
  //   post(Const.API.baseURL + Const.API.SignInPhone, params).then(res => {
  //     if (res.ok) {
  //       setLoading(false);
  //       // setToken(res.data.data.access_token);
  //       dispatch(
  //         AuthenOverallRedux.Actions.setToken(res.data.data.access_token),
  //       );
  //       dispatch(AuthenOverallRedux.Actions.loginSuccess(res.data.data));
  //     } else {
  //       setLoading(false);
  //       SimpleToast.show(res.error, SimpleToast.SHORT);
  //     }
  //   });
  // };

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
        }, 500);
      }
    });
  };

  return (
    <View style={container}>
      <AppLoading isVisible={loading} />
      <Appbar.Header>
        <Appbar.BackAction color="white" onPress={() => navigation.goBack()} />
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
          <View style={styles.viewPhone}>
            <TextInput
              value={password}
              onChangeText={setPassword}
              placeholder="Mật khẩu"
            />
          </View>
        </View>
        {/* {!confirm ? (
          <>
            <View style={styles.viewText}>
              <AppText title style={styles.textHello}>
                Xin chào!
              </AppText>
              <AppText>
                Xin vui lòng đăng nhập bằng số điện thoại của bạn
              </AppText>
            </View>
            <View style={styles.viewInput}>
              <AppInput
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                placeholder="Số điện thoại của bạn"
                keyboardType="numeric"
              />
            </View>
          </>
        ) : (
          <>
            <View style={styles.viewText}>
              <AppText title style={styles.textHello}>
                Rất tốt!
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
        )} */}
      </View>
      <Button
        containerStyle={styles.btnContinue}
        title={trans('continue').toUpperCase()}
        onPress={login}
      />
    </View>
  );
};

export default LoginScreen;
