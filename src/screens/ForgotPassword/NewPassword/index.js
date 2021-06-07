import React, {useState} from 'react';
import {View, TextInput} from 'react-native';
import {Appbar} from 'react-native-paper';
import SimpleToast from 'react-native-simple-toast';
import {useDispatch} from 'react-redux';
import {images} from '../../../assets';
import {AppImage, AppLoading, AppText} from '../../../components/atoms';
import {Button} from '../../../components/molecules';
import AppInput from '../../../components/molecules/AppInput';
import {AuthenOverallRedux} from '../../../redux';
import {post} from '../../../services/ServiceHandle';
import {container} from '../../../styles/GlobalStyles';
import {Const, trans} from '../../../utils';
import styles from '../styles';

const NewPassword = ({navigation}) => {
  const [phoneNumber, setPhoneNumber] = useState('');

  const [loading, setLoading] = useState(false);
  const [confirm, setConfirm] = useState(null);

  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [reRewPassword, setReNewPassword] = useState('');

  const dispatch = useDispatch();

  const handelCheckValue = () => {
    const regex =
      /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/;
    if (!regex.test(phoneNumber)) {
      SimpleToast.show('Số điện thoại không đúng định dạng', SimpleToast.LONG);
      return true;
    }
    if (!newPassword) {
      SimpleToast.show('Mật khẩu không được để trống', SimpleToast.SHORT);
      return true;
    }
    if (newPassword.length < 6) {
      SimpleToast.show(
        'Mật khẩu không được nhỏ hơn 6 kí tự',
        SimpleToast.SHORT,
      );
      return true;
    }
    return false;
  };

  const confirmPassword = () => {
    if (handelCheckValue()) {
      return;
    }
  };

  return (
    <View style={container}>
      <AppLoading isVisible={loading} />
      <Appbar.Header>
        <Appbar.BackAction color="white" onPress={() => navigation.goBack()} />
        <Appbar.Content color="white" title={trans('confirmPassword')} />
      </Appbar.Header>
      <View style={styles.viewContent}>
        <View style={styles.viewLogo}>
          <AppImage source={images.logoTransparent} imageStyle={styles.img} />
        </View>
        <View style={styles.viewText}>
          <AppText title style={styles.textHello}>
            {trans('confirmPassword')}
          </AppText>
        </View>
        <View style={styles.viewInput}>
          <View style={styles.viewPhone}>
            <TextInput
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              placeholder="Mật khẩu hiện tại"
              keyboardType="numeric"
            />
          </View>
          <View style={styles.viewPhone}>
            <TextInput
              value={newPassword}
              onChangeText={setNewPassword}
              placeholder="Mật khẩu mới"
            />
          </View>
          <View style={styles.viewPhone}>
            <TextInput
              value={reRewPassword}
              onChangeText={setReNewPassword}
              placeholder="Nhập lại mật khẩu mới"
            />
          </View>
        </View>
      </View>
      <Button
        containerStyle={styles.btnContinue}
        title={trans('continue').toUpperCase()}
        onPress={confirmPassword}
      />
    </View>
  );
};

export default NewPassword;
