import React, {Component} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Dimensions,
  ImageBackground,
  PixelRatio,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {AppText} from '../../../components/atoms';
import {Colors} from '../../../styles';

const {height, width} = Dimensions.get('window');

export default class BannerBehind extends Component {
  render() {
    const {
      leftImage,
      rightImage,
      onLeftPress,
      onRightPress,
      textCenter,
      icCamera,
      onCameraPress,
      backGround,
      avatar,
      accuracy,
    } = this.props;
    return (
      <View style={{width: '100%', height: 220}}>
        <ImageBackground source={backGround} style={styles.images}>
          <View style={styles.container}>
            <TouchableOpacity onPress={onLeftPress} style={styles.buttonLeft}>
              <FastImage source={leftImage} style={styles.ic_left} />
            </TouchableOpacity>

            <TouchableOpacity onPress={onRightPress}>
              <FastImage source={rightImage} style={styles.icClose} />
            </TouchableOpacity>
          </View>
          <View style={styles.areaCamera}>
            <TouchableOpacity onPress={onCameraPress}>
              <FastImage source={icCamera} style={styles.icCamera} />
            </TouchableOpacity>
          </View>
        </ImageBackground>
        <FastImage source={avatar} style={[styles.image, {bottom: 0}]} />
        <FastImage
          source={accuracy}
          resizeMode="contain"
          style={styles.accuracy}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 45,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttonLeft: {
    width: '10%',
    height: 45,
    justifyContent: 'center',
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  left: {
    justifyContent: 'center',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  right: {
    justifyContent: 'center',
  },
  ic_left: {
    width: 12,
    aspectRatio: 1 / 1.8,
    marginLeft: 20,
  },
  textCenter: {
    fontSize: 20,
    fontWeight: '500',
    color: 'black',
  },
  icClose: {
    width: 20,
    aspectRatio: 1 / 1,
    marginRight: 20,
  },
  images: {
    width: '100%',
    height: '85%',
  },
  icCamera: {
    width: 22,
    aspectRatio: 1.1 / 1,
  },
  areaCamera: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    paddingRight: 20,
    paddingBottom: 20,
  },
  image: {
    width: width / 3.2,
    aspectRatio: 1 / 1,
    borderRadius: 100,
    alignSelf: 'center',
    position: 'absolute',
    // top: 35,
    backgroundColor: Colors.WHITE,
  },
  accuracy: {
    width: 148,
    height: 30,
    alignSelf: 'center',
    marginTop: 10,
  },
});
