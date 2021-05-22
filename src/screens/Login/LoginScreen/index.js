import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {Appbar} from 'react-native-paper';
import {images} from '../../../assets';
import {AppImage, AppLoading, AppText} from '../../../components/atoms';
import {Button} from '../../../components/molecules';
import AppInput from '../../../components/molecules/AppInput';
import {container} from '../../../styles/GlobalStyles';
import {trans} from '../../../utils';
import styles from '../styles';
import SimpleToast from 'react-native-simple-toast';
import {statusBar} from '../../../styles/Mixin';
import auth from '@react-native-firebase/auth';

const LoginScreen = ({navigation}) => {
  const [phoneNumber, setPhoneNumber] = useState('');

  const [loading, setLoading] = useState(false);

  const goOTPScreen = async () => {
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
        navigation.navigate('OTPLogin', {
          confirm: confirmation,
        });
      } else {
        setLoading(false);
        setTimeout(() => {
          SimpleToast.show(confirmation, SimpleToast.SHORT);
        }, 500);
      }
    } catch (error) {}
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
        <View style={styles.viewText}>
          <AppText title style={styles.textHello}>
            Xin chào!
          </AppText>
          <AppText>Xin vui lòng đăng nhập bằng số điện thoại của bạn</AppText>
        </View>
        <View style={styles.viewInput}>
          <AppInput
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            placeholder="Số điện thoại của bạn"
            keyboardType="numeric"
          />
        </View>
      </View>
      <Button
        containerStyle={styles.btnContinue}
        title={trans('continue').toUpperCase()}
        onPress={goOTPScreen}
      />
    </View>
  );
};

export default LoginScreen;
