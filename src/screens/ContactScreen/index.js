import React from 'react';
import {ScrollView, TextInput, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Appbar} from 'react-native-paper';
import {images} from '../../assets';
import {AppText} from '../../components/atoms';
import AppInput from '../../components/molecules/AppInput';
import {Colors} from '../../styles';
import {container} from '../../styles/GlobalStyles';
import {device_height} from '../../styles/Mixin';
import {trans} from '../../utils';

const ContactScreen = () => {
  return (
    <ScrollView style={container}>
      <Appbar.Header>
        <Appbar.Content
          style={{alignItems: 'center'}}
          color="white"
          title={trans('contactAkini')}
        />
      </Appbar.Header>
      <FastImage
        source={images.contactBG}
        style={{width: '100%', height: 200}}
      />
      <View style={{flex: 1, paddingHorizontal: 16, marginTop: 16}}>
        <AppText>Liên hệ</AppText>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 8,
          }}>
          <TouchableOpacity>
            <FastImage
              source={images.facebook}
              style={{width: 50, height: 50}}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <FastImage source={images.zalo} style={{width: 50, height: 50}} />
          </TouchableOpacity>
          <TouchableOpacity>
            <FastImage source={images.gmail} style={{width: 50, height: 50}} />
          </TouchableOpacity>
          <TouchableOpacity>
            <FastImage
              source={images.message}
              style={{width: 50, height: 50}}
            />
          </TouchableOpacity>
          <View style={{width: 50, height: 50}} />
        </View>
        <AppText style={{marginTop: 20}}>
          Phản hồi chất lượng Dịch vụ / Sản Phẩm
        </AppText>

        <View
          style={{
            height: 40,
            width: '100%',
            backgroundColor: Colors.GREEN_2,
            justifyContent: 'center',
            paddingLeft: 16,
            borderBottomWidth: 1,
            borderBottomColor: Colors.WHITE,
            marginTop: 16,
            borderTopRightRadius: 16,
            borderTopLeftRadius: 16,
          }}>
          <TextInput
            style={{fontStyle: 'italic'}}
            placeholderTextColor={Colors.BLACK}
            placeholder="Chủ đề phản hồi của bạn"
          />
        </View>
        <View
          style={{
            height: device_height / 4,
            backgroundColor: Colors.GREEN_2,
            padding: 16,
            borderBottomRightRadius: 16,
            borderBottomLeftRadius: 16,
          }}>
          <TextInput
            style={{
              flex: 1,
              fontStyle: 'italic',
              textAlignVertical: 'top',
            }}
            multiline
            placeholderTextColor={Colors.BLACK}
            placeholder="Nội dung phản hồi của bạn"
          />
        </View>
        <TouchableOpacity></TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ContactScreen;
