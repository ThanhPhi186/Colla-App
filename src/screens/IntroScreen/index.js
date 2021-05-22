import React, {useState} from 'react';
import {Image, StatusBar, Text, View} from 'react-native';
import {AppText} from '../../components/atoms';
import AppIntroSlider from 'react-native-app-intro-slider';
import {images} from '../../assets';
import {Colors} from '../../styles';
import FastImage from 'react-native-fast-image';

const IntroScreen = ({navigation}) => {
  const data = [
    {
      key: 'one',
      title: 'Nền tảng kinh doanh cho mẹ bỉm sữa',
      text: 'Chưa bao giờ dễ dàng đến thế',
      image: images.logoIntro,
      backgroundColor: '#59b2ab',
    },
    {
      key: 'two',
      title: 'Hệ thống mặt hàng đa dạng',
      text: 'Giá cả hấp dẫn',
      image: images.intro2,
      backgroundColor: '#febe29',
    },
    {
      key: 'three',
      title: 'Giới thiệu càng nhiều bạn bè',
      text: 'Hoa hồng càng cao',
      image: images.intro3,
      backgroundColor: '#22bcb5',
    },
    {
      key: 'four',
      title: 'Hãy đến với chúng tôi',
      text: 'Bạn đã sẵn sàng trải nhiệm',
      image: images.intro4,
      backgroundColor: '#22bcb5',
    },
  ];

  const [showRealApp, setShowRealApp] = useState(false);

  const renderItem = ({item}) => {
    return (
      <View style={[styles.slide]}>
        <View style={{flex: 2, justifyContent: 'center'}}>
          <Text style={styles.title}>{item.title}</Text>
        </View>
        <View style={{flex: 5, justifyContent: 'center'}}>
          <FastImage
            resizeMode="contain"
            source={item.image}
            style={styles.image}
          />
        </View>
        <View style={{flex: 2}}>
          <Text style={styles.text}>{item.text}</Text>
        </View>
      </View>
    );
  };
  const onDone = () => {
    // setShowRealApp(true);
    navigation.navigate('StartLogin');
  };

  return (
    <View style={{flex: 1}}>
      <StatusBar translucent backgroundColor="transparent" />
      <AppIntroSlider
        keyExtractor={item => item.title}
        renderItem={renderItem}
        data={data}
        onDone={onDone}
      />
    </View>
  );
};
const styles = {
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.PRIMARY,
  },
  image: {
    width: 320,
    height: 200,
    marginVertical: 32,
  },
  text: {
    color: 'white',
    textAlign: 'center',
  },
  title: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
  },
};
export default IntroScreen;
