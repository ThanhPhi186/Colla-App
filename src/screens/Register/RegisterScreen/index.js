import React, {useState} from 'react';
import {View} from 'react-native';
import {Appbar} from 'react-native-paper';
import {images} from '../../../assets';
import {AppImage, AppLoading, AppText} from '../../../components/atoms';
import {Button} from '../../../components/molecules';
import AppInput from '../../../components/molecules/AppInput';
import {container} from '../../../styles/GlobalStyles';
import {Const, trans} from '../../../utils';
import styles from '../styles';
import SimpleToast from 'react-native-simple-toast';
import {statusBar} from '../../../styles/Mixin';
import auth from '@react-native-firebase/auth';
import {useDispatch} from 'react-redux';
import {post, setToken} from '../../../services/ServiceHandle';
import {AuthenOverallRedux} from '../../../redux';

const RegisterScreen = ({navigation}) => {
  const [phoneNumber, setPhoneNumber] = useState('');

  const [loading, setLoading] = useState(false);
  const [confirm, setConfirm] = useState(null);

  const [code, setCode] = useState('');

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
  //     setLoading(false);
  //   }
  // };

  // const confirmOTP = async () => {
  //   setLoading(true);
  //   try {
  //     const confirmResult = await confirm.confirm(code);
  //     if (confirmResult) {
  //       auth().onAuthStateChanged(user => {
  //         if (user) {
  //           user.getIdToken().then(token => {
  //             post(Const.API.baseURL + Const.API.VerifyPhone, {token}).then(
  //               res => {
  //                 if (res.ok) {
  //                   setToken(res.data.data.access_token);
  //                   dispatch(
  //                     AuthenOverallRedux.Actions.loginSuccess(res.data.data),
  //                   );
  //                   navigation.navigate('NameRegister', {
  //                     tokenState: res.data.data.access_token,
  //                   });
  //                   setLoading(false);
  //                 } else {
  //                   SimpleToast.show(res.error, SimpleToast.SHORT);
  //                   setLoading(false);
  //                 }
  //               },
  //             );
  //           });
  //         }
  //       });
  //     }
  //   } catch (error) {
  //     console.log('error', error);
  //     SimpleToast.show(error, SimpleToast.LONG);
  //     // SimpleToast.show('Mã OTP không khớp', SimpleToast.LONG);
  //   }
  // };

  const confirmOTP = () => {
    const params = {
      phoneNumber: `+84${Number(phoneNumber)}`,
      otp: code,
    };
    post(Const.API.baseURL + Const.API.SignInPhone, params).then(res => {
      if (res.ok) {
        setToken(res.data.data.access_token);
        dispatch(AuthenOverallRedux.Actions.loginSuccess(res.data.data));
        navigation.navigate('NameRegister', {
          tokenState: res.data.data.access_token,
        });
        setLoading(false);
      } else {
        setLoading(false);
        SimpleToast.show(res.error, SimpleToast.SHORT);
      }
    });
  };

  const checkPhone = () => {
    const regex =
      /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/;
    if (!regex.test(phoneNumber)) {
      return SimpleToast.show(
        'Số điện thoại không đúng định dạng',
        SimpleToast.LONG,
      );
    }
    const convertPhone = `+84${Number(phoneNumber)}`;
    const params = {phoneNumber: convertPhone};

    post(Const.API.baseURL + Const.API.CheckPhone, params).then(res => {
      if (res.ok) {
        SimpleToast.show(
          'Tài khoản đã tồn tại trong hệ thống, vui lòng đăng nhập',
        );
      } else {
        setConfirm('123456');
      }
    });
  };

  return (
    <View style={container}>
      <AppLoading isVisible={loading} />
      <Appbar.Header statusBarHeight={statusBar}>
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
                keyboardType="numeric"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                placeholder="Số điện thoại của bạn"
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
