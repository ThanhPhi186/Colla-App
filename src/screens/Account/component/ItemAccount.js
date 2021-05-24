import React, {Component} from 'react';
import {View, TouchableOpacity} from 'react-native';

import FastImage from 'react-native-fast-image';
import {AppText} from '../../../components/atoms';
import {images} from '../../../assets';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Colors} from '../../../styles';

const ItemAccount = props => {
  const {icon, title, onPress} = props;
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={{width: '80%', flexDirection: 'row', alignItems: 'center'}}>
        <Icon name={icon} size={24} style={styles.ic} color={Colors.ORANGE} />
        <AppText style={styles.textTitle}>{title}</AppText>
      </View>
    </TouchableOpacity>
  );
};
const styles = {
  container: {
    flexDirection: 'row',
    paddingLeft: 15,
    paddingRight: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 50,
  },
  ic: {
    marginRight: 10,
  },
  textTitle: {
    fontSize: 17,
    fontWeight: '400',
  },
  arrow: {
    width: '2.5%',
    aspectRatio: 1.2 / 2,
  },
};

export default ItemAccount;
