import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {Appbar} from 'react-native-paper';
import {images} from '../../../assets';
import {AppImage, AppText} from '../../../components/atoms';
import {Button} from '../../../components/molecules';
import AppInput from '../../../components/molecules/AppInput';
import {container} from '../../../styles/GlobalStyles';
import {Const, trans} from '../../../utils';
import styles from '../styles';
import auth from '@react-native-firebase/auth';
import {post, setToken} from '../../../services/ServiceHandle';
import SimpleToast from 'react-native-simple-toast';
import {useDispatch} from 'react-redux';
import {AuthenOverallRedux} from '../../../redux';
import {statusBar} from '../../../styles/Mixin';

const OTPLogin = ({navigation, route}) => {
  const [code, setCode] = useState('');

  const {confirm} = route.params;
  console.log('confirm', confirm);

  const dispatch = useDispatch();

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
      <Appbar.Header statusBarHeight={statusBar}>
        <Appbar.BackAction color="white" onPress={() => navigation.goBack()} />
        <Appbar.Content color="white" title={trans('login')} />
      </Appbar.Header>
      <View style={styles.viewContent}>
        <View style={styles.viewLogo}>
          <AppImage source={images.logoTransparent} imageStyle={styles.img} />
        </View>
        <View style={styles.viewText}>
          <AppText title style={styles.textHello}>
            Rất tốt!
          </AppText>
          <AppText>Vui lòng nhập mã OTP được gửi đến tin nhắn của bạn</AppText>
        </View>
        <View style={styles.viewInput}>
          <AppInput
            value={code}
            onChangeText={setCode}
            placeholder="Mã OTP của bạn"
            keyboardType="numeric"
          />
        </View>
      </View>
      <Button
        containerStyle={styles.btnContinue}
        title={trans('continue').toUpperCase()}
        onPress={confirmOTP}
      />
    </View>
  );
};

export default OTPLogin;
