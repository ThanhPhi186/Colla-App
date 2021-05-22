import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Const} from '../../utils';
import {AppText} from '../atoms';
import numeral from 'numeral';
import {device_width} from '../../styles/Mixin';
import {Colors} from '../../styles';
const ItemProduct = props => {
  const {item} = props;
  return (
    <View style={{flex: 1 / 2}}>
      <TouchableOpacity {...props} style={styles.container}>
        <FastImage
          resizeMode="contain"
          source={{uri: Const.API.baseURL + item.photo}}
          style={styles.image}
        />
        <View style={styles.viewNamePrice}>
          <AppText
            numberOfLines={1}
            containerStyle={{width: '40%'}}
            style={styles.txtName}>
            {item.name}
          </AppText>
          <AppText containerStyle={{width: '50%'}} style={styles.txtPrice}>
            {numeral(item.price).format()} đ
          </AppText>
        </View>
        <AppText style={styles.txtOrigin}>RUSSIA</AppText>
      </TouchableOpacity>
    </View>
  );
};
const styles = {
  container: {
    backgroundColor: Colors.WHITE,
    borderRadius: 15,
    width: device_width / 2.4,
    alignSelf: 'center',
    padding: 4,
    marginVertical: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: device_width / 2.75,
    aspectRatio: 1 / 1,
    alignSelf: 'center',
    marginTop: 5,
    borderRadius: 3,
    borderWidth: 0.7,
    borderColor: Colors.LIGHT_GREY,
  },
  txtName: {
    fontWeight: 'bold',
  },
  txtPrice: {
    fontWeight: 'bold',
    color: Colors.GREEN_1,
  },
  viewNamePrice: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  txtOrigin: {
    paddingHorizontal: 10,
    fontWeight: 'bold',
    color: '#b1e5d3',
    paddingTop: 3,
  },
};
export default ItemProduct;
