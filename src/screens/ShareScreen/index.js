import React, {useState} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Appbar} from 'react-native-paper';
import {images} from '../../assets';
import {AppText} from '../../components/atoms';
import {Button} from '../../components/molecules';
import {Colors} from '../../styles';
import {
  container,
  HEIGHT_MIDDLE_HOME_BTN,
  NAVIGATION_BOTTOM_TABS_HEIGHT,
} from '../../styles/GlobalStyles';
import {Const, trans} from '../../utils';
import numeral from 'numeral';
import {useSelector} from 'react-redux';
import Share from 'react-native-share';
import Clipboard from '@react-native-community/clipboard';
import SimpleToast from 'react-native-simple-toast';

const ShareScreen = () => {
  const userInfo = useSelector(state => state.AuthenOverallReducer.userAuthen);
  const appConfig = useSelector(state => state.AppConfigReducer.appConfig);

  const shareOption = async () => {
    const shareOptions = {
      title: 'Share via',
      message: 'some message',
      url: 'some share url',
      subject: 'Share Link',
      social: Share.Social.FACEBOOK,
    };

    await Share.open(shareOptions);
  };

  const coppyText = () => {
    Clipboard.setString(userInfo.affiliateCode);
    SimpleToast.show('Sao chép mã giới thiệu thành công', SimpleToast.SHORT);
  };

  return (
    <View style={container}>
      <Appbar.Header>
        <Appbar.Content
          style={{alignItems: 'center'}}
          color="white"
          title={trans('share')}
        />
      </Appbar.Header>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: NAVIGATION_BOTTOM_TABS_HEIGHT + HEIGHT_MIDDLE_HOME_BTN,
        }}>
        <FastImage
          source={{
            uri: Const.API.baseUrlImage + appConfig?.general?.shareBanner,
          }}
          style={{width: '100%', height: 200}}
          resizeMode="contain"
        />
        <View style={{paddingHorizontal: 16, marginTop: 16}}>
          {/* <AppText>Link chia sẻ</AppText>
          <View style={{flexDirection: 'row', marginTop: 4}}>
            <View
              style={{
                height: 40,
                backgroundColor: Colors.GREEN_2,
                justifyContent: 'center',
                flex: 3,
                paddingLeft: 12,
                borderTopLeftRadius: 12,
                borderBottomLeftRadius: 12,
              }}>
              <Text numberOfLines={1}>
                https://www.google.com/url?sa=i&url=http%3A%2F%2Fwww.shivramgroup.com%2Fcontact%2F&psig=AOvVaw1MwyZ-E6KjPplVsCf8DPzj&ust=1622519122961000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCLj4oMqB8_ACFQAAAAAdAAAAABAS
              </Text>
            </View>
            <TouchableOpacity
              style={{
                flex: 1,
                height: 40,
                justifyContent: 'center',
                backgroundColor: Colors.ORANGE,
                alignItems: 'center',
                borderTopRightRadius: 12,
                borderBottomRightRadius: 12,
              }}>
              <AppText style={{color: Colors.WHITE, fontWeight: 'bold'}}>
                {trans('copy')}
              </AppText>
            </TouchableOpacity>
          </View> */}

          <AppText style={{marginTop: 16}}>Mã giới thiệu của bạn</AppText>
          
          <View
            style={{flexDirection: 'row', alignItems: 'center', marginTop: 4}}>
            <AppText
              containerStyle={{
                height: 40,
                backgroundColor: Colors.GREEN_2,
                justifyContent: 'center',
                borderTopLeftRadius: 12,
                borderBottomLeftRadius: 12,

                width: '40%',
                alignItems: 'center',
              }}
              style={{fontWeight: 'bold'}}>
              {userInfo.affiliateCode}
            </AppText>
            <TouchableOpacity
              onPress={coppyText}
              style={{
                height: 40,
                width: '30%',
                justifyContent: 'center',
                backgroundColor: Colors.ORANGE,
                alignItems: 'center',
                borderTopRightRadius: 12,
                borderBottomRightRadius: 12,
              }}>
              <AppText style={{color: Colors.WHITE, fontWeight: 'bold'}}>
                {trans('copy')}
              </AppText>
            </TouchableOpacity>
          </View>

          {/* <AppText style={{marginTop: 16}}>Chia sẻ</AppText>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 8,
            }}>
            <TouchableOpacity
            //  onPress={shareOption}
            >
              <FastImage
                source={images.facebook}
                style={{width: 50, height: 50}}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <FastImage
                source={images.insta}
                style={{width: 50, height: 50}}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <FastImage source={images.zalo} style={{width: 50, height: 50}} />
            </TouchableOpacity>
            <TouchableOpacity>
              <FastImage
                source={images.gmail}
                style={{width: 50, height: 50}}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <FastImage
                source={images.message}
                style={{width: 50, height: 50}}
              />
            </TouchableOpacity>
          </View> */}

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 40,
              paddingBottom: 16,
            }}>
            <View
              style={{
                width: '42%',
                height: 100,
                borderRadius: 12,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: Colors.WHITE,
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
              }}>
              <Text style={{fontWeight: 'bold'}}>
                <Text style={{color: Colors.ORANGE}}>
                  {numeral(50).format()}{' '}
                </Text>
                Người
              </Text>
              <AppText style={{marginTop: 16}}>số người giới thiệu</AppText>
            </View>
            <View
              style={{
                width: '42%',
                height: 100,
                borderRadius: 12,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: Colors.WHITE,
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
              }}>
              <Text style={{fontWeight: 'bold'}}>
                <Text style={{color: Colors.ORANGE}}>
                  {numeral(userInfo.point).format()}{' '}
                </Text>
                điểm
              </Text>
              <AppText style={{marginTop: 16}}>Số điểm tích luỹ</AppText>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default ShareScreen;
