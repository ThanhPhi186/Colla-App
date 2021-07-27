import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';

import numeral from 'numeral';

import Icon from 'react-native-vector-icons/FontAwesome5';
import {Const} from '../../../utils';
import {AppText} from '../../../components/atoms';
import {Colors, Mixin} from '../../../styles';
import {device_width} from '../../../styles/Mixin';

const ItemPopular = props => {
  const {item, addToCart} = props;

  return item.is_combo ? (
    <View style={{flex: 1 / 2}}>
      <TouchableOpacity {...props} style={styles.container}>
        <FastImage
          resizeMode="contain"
          source={{uri: Const.API.baseUrlImage + item.photos[0].photo}}
          style={styles.image}
        />
        <View style={styles.viewNamePrice}>
          <AppText numberOfLines={2} style={styles.txtName}>
            {item.name}
          </AppText>

          <AppText style={styles.txtPrice}>
            {numeral(item.price).format()} đ
          </AppText>
          {item.combo_products.length > 0 && (
            <Text style={{flex: 1}}>
              Tặng kèm:{' '}
              <Text>
                {item.combo_products.map(elm => elm.name).join(' + ')}
              </Text>
            </Text>
          )}
        </View>
        {addToCart && (
          <TouchableOpacity style={styles.btnCart} onPress={addToCart}>
            <Icon name="cart-plus" size={18} color={Colors.WHITE} />
          </TouchableOpacity>
        )}
      </TouchableOpacity>
    </View>
  ) : (
    <View style={{flex: 1 / 2}}>
      <TouchableOpacity {...props} style={styles.container}>
        <FastImage
          resizeMode="contain"
          source={{uri: Const.API.baseUrlImage + item.photos[0].photo}}
          style={styles.image}
        />
        <View style={styles.viewNamePrice}>
          <AppText numberOfLines={1} style={styles.txtName}>
            {item.name}
          </AppText>
          <AppText style={styles.txtPrice}>
            {numeral(item.price).format()} đ
          </AppText>
        </View>
        {addToCart && (
          <TouchableOpacity style={styles.btnCart} onPress={addToCart}>
            <Icon name="cart-plus" size={18} color={Colors.WHITE} />
          </TouchableOpacity>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = {
  container: {
    backgroundColor: Colors.WHITE,
    borderRadius: 12,
    width: device_width / 2.2,
    paddingBottom: 12,
    alignSelf: 'center',
    marginVertical: 8,
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
    width: device_width / 2.2,
    aspectRatio: 1 / 1,
    alignSelf: 'center',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    borderWidth: 0.7,
    borderColor: Colors.LIGHT_GREY,
  },
  txtName: {
    fontWeight: 'bold',
    flex: 1,
  },
  txtPrice: {
    fontWeight: 'bold',
    color: Colors.GREEN_1,
    marginVertical: Mixin.moderateSize(4),
  },
  viewNamePrice: {
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  txtOrigin: {
    paddingHorizontal: 10,
    fontWeight: 'bold',
    color: '#b1e5d3',
    paddingTop: 3,
  },
  btnCart: {
    backgroundColor: Colors.GREEN_1,
    width: Mixin.moderateSize(48),
    height: Mixin.moderateSize(36),
    alignSelf: 'flex-end',
    borderBottomRightRadius: 16,
    borderTopLeftRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Mixin.moderateSize(8),
    marginBottom: -12,
  },
};
export default ItemPopular;
