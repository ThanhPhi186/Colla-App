import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {Appbar} from 'react-native-paper';
import {images} from '../../../assets';
import {AppImage, AppLoading, AppText} from '../../../components/atoms';
import {Button} from '../../../components/molecules';
import AppInput from '../../../components/molecules/AppInput';
import {container} from '../../../styles/GlobalStyles';
import {Const, trans} from '../../../utils';
import styles from '../styles';
import auth from '@react-native-firebase/auth';
import SimpleToast from 'react-native-simple-toast';
import {post, setToken} from '../../../services/ServiceHandle';
import {AuthenOverallRedux} from '../../../redux';
import {useDispatch} from 'react-redux';
import {statusBar} from '../../../styles/Mixin';

const OTPRegister = ({navigation, route}) => {
  const [code, setCode] = useState('');

  const {confirm} = route.params;

  const {phoneReal} = route.params;

  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const confirmOTP = async () => {
    setLoading(true);
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
                      AuthenOverallRedux.Actions.loginSuccess(res.data.data),
                    );
                    navigation.navigate('NameRegister', {
                      tokenState: res.data.data.access_token,
                    });
                    setLoading(false);
                  } else {
                    SimpleToast.show(res.error, SimpleToast.SHORT);
                    setLoading(false);
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
        <Appbar.Content color="white" title={trans('register')} />
      </Appbar.Header>
      <View style={styles.viewContent}>
        <View style={styles.viewLogo}>
          <AppImage source={images.logoTransparent} imageStyle={styles.img} />
        </View>
        <View style={styles.viewText}>
          <AppText title style={styles.textHello}>
            Xin chào {phoneReal}
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

export default OTPRegister;
