import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {images} from '../../assets';
import {AppImage, AppText} from '../../components/atoms';
import {Button} from '../../components/molecules';
import {Colors} from '../../styles';
import {containerCenter} from '../../styles/GlobalStyles';

const StartLogin = ({navigation}) => {
  return (
    <View style={containerCenter}>
      <View style={{flex: 1}} />
      <View style={{flex: 1, justifyContent: 'center'}}>
        <AppImage
          source={images.logoTransparent}
          imageStyle={{width: 150, height: 50}}
        />
      </View>

      <AppText>Đăng nhập để kinh doanh cùng Colla</AppText>
      <Button
        containerStyle={{marginTop: 40}}
        title="Đăng nhập bằng số điện thoại"
        onPress={() => navigation.navigate('LoginScreen')}
      />

      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <AppText>Đăng ký tài khoản để sử dụng ứng dụng Colla</AppText>
        <Button
          containerStyle={{
            width: '30%',
            height: 40,
            backgroundColor: Colors.ORANGE,
            marginTop: 20,
          }}
          title="Đăng ký"
          onPress={() => navigation.navigate('RegisterStack')}
        />
      </View>
      <TouchableOpacity
        style={{flex: 1, justifyContent: 'center'}}
        onPress={() => navigation.goBack()}>
        <AppText style={{fontWeight: 'bold'}}>Bỏ qua</AppText>
      </TouchableOpacity>
    </View>
  );
};

export default StartLogin;
