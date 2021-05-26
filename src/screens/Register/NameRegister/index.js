import React, {useState} from 'react';
import {View} from 'react-native';
import {Appbar} from 'react-native-paper';
import SimpleToast from 'react-native-simple-toast';
import {images} from '../../../assets';
import {AppImage, AppText} from '../../../components/atoms';
import {Button} from '../../../components/molecules';
import AppInput from '../../../components/molecules/AppInput';
import {post} from '../../../services/ServiceHandle';
import {container} from '../../../styles/GlobalStyles';
import {statusBar} from '../../../styles/Mixin';
import {Const, trans} from '../../../utils';
import styles from '../styles';

const NameRegister = ({navigation, route}) => {
  const [userName, setUserName] = useState('');

  const {tokenState} = route.params;

  const nameRegister = () => {
    if (!userName) {
      return SimpleToast.show('Không được bỏ trống tên', SimpleToast.SHORT);
    }
    const params = {
      fullname: userName,
    };
    post(Const.API.baseURL + Const.API.UpdateProfile, params).then(res => {
      if (res.ok) {
        navigation.navigate('IntroductionCode', {tokenState});
      } else {
        SimpleToast.show(res.error, SimpleToast.SHORT);
      }
    });
  };

  return (
    <View style={container}>
      <Appbar.Header>
        <Appbar.BackAction color="white" onPress={() => navigation.goBack()} />
        <Appbar.Content color="white" title={trans('register')} />
      </Appbar.Header>
      <View style={styles.viewContent}>
        <View style={styles.viewLogo}>
          <AppImage source={images.logoTransparent} imageStyle={styles.img} />
        </View>
        <View style={styles.viewText}>
          <AppText title style={styles.textHello}>
            Tốt lắm!
          </AppText>
          <AppText>Hãy điền thông tin theo hướng dẫn sau</AppText>
        </View>
        <View style={styles.viewInput}>
          <AppInput
            value={userName}
            onChangeText={setUserName}
            placeholder="Tên của bạn"
          />
        </View>
      </View>
      <Button
        containerStyle={styles.btnContinue}
        title={trans('continue').toUpperCase()}
        onPress={nameRegister}
      />
    </View>
  );
};

export default NameRegister;
