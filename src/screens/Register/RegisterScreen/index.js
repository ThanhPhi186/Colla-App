import React, {useState} from 'react';
import {View} from 'react-native';
import {Appbar} from 'react-native-paper';
import {images} from '../../../assets';
import {AppImage, AppText} from '../../../components/atoms';
import {Button} from '../../../components/molecules';
import AppInput from '../../../components/molecules/AppInput';
import {container} from '../../../styles/GlobalStyles';
import {trans} from '../../../utils';
import styles from '../styles';
import SimpleToast from 'react-native-simple-toast';
import {statusBar} from '../../../styles/Mixin';
import auth from '@react-native-firebase/auth';

const RegisterScreen = ({navigation}) => {
  const [phoneNumber, setPhoneNumber] = useState('');

  const [loading, setLoading] = useState(false);

  const goOTPScreen = async () => {
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
    const phoneReal = `0${Number(phoneNumber)}`;
    const confirmation = await auth().signInWithPhoneNumber(convertPhone);
    if (confirmation) {
      setLoading(false);
      navigation.navigate('OTPRegister', {
        confirm: confirmation,
        phoneReal: phoneReal,
      });
    } else {
      setLoading(false);
      setTimeout(() => {
        SimpleToast.show(confirmation, SimpleToast.SHORT);
      }, 500);
    }
  };

  return (
    <View style={container}>
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
      </View>
      <Button
        containerStyle={styles.btnContinue}
        title={trans('continue').toUpperCase()}
        onPress={goOTPScreen}
      />
    </View>
  );
};

export default RegisterScreen;
