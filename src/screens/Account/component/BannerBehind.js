import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {AppText} from '../../../components/atoms';
import {Colors, Mixin} from '../../../styles';
import {device_width} from '../../../styles/Mixin';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {getStatusBarHeight} from '../../../helpers/iphoneXHelper';

export default class BannerBehind extends Component {
  render() {
    const {backGround, avatar, goAccountDetail} = this.props;

    return (
      <View style={styles.container}>
        <ImageBackground source={backGround} style={styles.backGround} />
        <FastImage source={avatar} style={styles.image} />
        <TouchableOpacity
          onPress={goAccountDetail}
          style={{
            position: 'absolute',
            top: getStatusBarHeight(true),
            right: 20,
          }}>
          <Icon name="square-edit-outline" size={24} color={Colors.WHITE} />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: Mixin.moderateSize(200),
  },
  backGround: {
    width: '100%',
    height: '85%',
  },
  image: {
    width: device_width / 3.2,
    aspectRatio: 1 / 1,
    borderRadius: 100,
    alignSelf: 'center',
    position: 'absolute',
    backgroundColor: Colors.WHITE,
    bottom: 0,
  },
});
