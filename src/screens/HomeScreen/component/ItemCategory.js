import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';

import {images} from '../../../assets';
import {Const} from '../../../utils';

const ItemCategory = props => {
  const {item} = props;

  return (
    <View style={styles.container}>
      <TouchableOpacity {...props} style={styles.button}>
        <View style={styles.circle}>
          <FastImage
            source={{uri: Const.API.baseUrlImage + item.feature_image}}
            style={styles.item}
          />
        </View>
        <View style={{width: '100%'}}>
          <Text
            style={{
              marginTop: 3,
              marginBottom: 3,
              textAlign: 'center',
              fontSize: 13,
            }}
            numberOfLines={2}>
            {item.name}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  circle: {
    width: 48,
    height: 48,
  },
  item: {
    width: 48,
    height: 48,
    borderRadius: 56 / 2,
  },
  button: {
    alignItems: 'center',
    paddingVertical: 10,
    height: 100,
  },
};

export default ItemCategory;
