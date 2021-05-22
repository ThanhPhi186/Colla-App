import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
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
import {post} from '../../services/ServiceHandle';
import {setToken} from '../../redux/authen/action';
import {useDispatch} from 'react-redux';
import {AuthenOverallRedux} from '../../redux';

const LoginScreen = ({navigation}) => {
  const [phoneNumber, setPhoneNumber] = useState('');

  const [loading, setLoading] = useState(false);

  const [confirm, setConfirm] = useState(null);

  const [code, setCode] = useState('');

  const dispatch = useDispatch();

  const getOTP = async () => {
    try {
      const regex =
        /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/;
      if (!regex.test(phoneNumber)) {
        return SimpleToast.show(
          'Số điện thoại không đúng định dạng',
          SimpleToast.LONG,
        );
      }
      setLoading(true);
      const convertPhone = `+84${Number(phoneNumber)}`;
      const confirmation = await auth().signInWithPhoneNumber(convertPhone);
      if (confirmation) {
        setLoading(false);
        setConfirm(confirmation);
      } else {
        setLoading(false);
        setTimeout(() => {
          SimpleToast.show(confirmation, SimpleToast.SHORT);
        }, 500);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  const confirmOTP = async () => {
    try {
      const confirmResult = await confirm.confirm(code);
      if (confirmResult) {
        auth().onAuthStateChanged(user => {
          if (user) {
            user.getIdToken().then(token => {
              post(Const.API.baseURL + Const.API.VerifyPhone, {token}).then(
                res => {
                  if (res.ok) {
                    setToken(res.data.data.access_token);
                    dispatch(
                      AuthenOverallRedux.Actions.setToken(
                        res.data.data.access_token,
                      ),
                    );
                    dispatch(
                      AuthenOverallRedux.Actions.loginSuccess(res.data.data),
                    );
                  } else {
                    SimpleToast.show(res.error, SimpleToast.SHORT);
                  }
                },
              );
            });
          }
        });
      }
    } catch (error) {
      console.log('error', error);
      SimpleToast.show(error, SimpleToast.LONG);
      // SimpleToast.show('Mã OTP không khớp', SimpleToast.LONG);
    }
  };
  return (
    <View style={container}>
      <AppLoading isVisible={loading} />
      <Appbar.Header statusBarHeight={statusBar}>
        <Appbar.BackAction color="white" onPress={() => navigation.goBack()} />
        <Appbar.Content color="white" title={trans('login')} />
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
        )}
      </View>
      <Button
        containerStyle={styles.btnContinue}
        title={trans('continue').toUpperCase()}
        onPress={!confirm ? getOTP : confirmOTP}
      />
    </View>
  );
};

export default LoginScreen;
