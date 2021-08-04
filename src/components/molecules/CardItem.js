import React from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {images} from '../../assets';
import {Colors, Mixin} from '../../styles';
import {Const} from '../../utils';
import {AppText} from '../atoms';
import numeral from 'numeral';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const CardItem = props => {
  const {
    type,
    item,
    addAmountProps,
    lessAmountProps,
    styleProps,
    changeAmountProps,
  } = props;

  const showProduct = item.product ? item.product : item;

  console.log('item', item);

  return (
    <TouchableOpacity style={[styles.container, styleProps]} {...props}>
      <View style={styles.viewImg}>
        <FastImage
          resizeMode="contain"
          style={styles.img}
          source={
            showProduct.photos.length > 0
              ? {uri: Const.API.baseUrlImage + showProduct.photos[0].photo}
              : images.noImage
          }
        />
      </View>
      <View style={styles.leftContent}>
        <AppText style={styles.nameProduct} numberOfLines={1}>
          {showProduct.name}
        </AppText>

        <AppText style={styles.txtPrice}>
          {numeral(showProduct.price).format()} đ
        </AppText>
        {showProduct.combo_products.length > 0 && (
          <Text style={{marginTop: Mixin.moderateSize(4)}}>
            Tặng kèm:{' '}
            <Text>
              {showProduct.combo_products.map(elm => elm.name).join(' + ')}
            </Text>
          </Text>
        )}
      </View>
      {type === 'choose' && (
        <View style={styles.viewQuantity}>
          <TouchableOpacity onPress={() => lessAmountProps(item)}>
            <Icon name="minus-circle" size={28} color={Colors.PRIMARY} />
          </TouchableOpacity>
          <TextInput
            style={styles.boxAmount}
            value={item.amount.toString()}
            keyboardType="number-pad"
            onChangeText={valueInput => changeAmountProps(valueInput, item)}
          />
          <TouchableOpacity onPress={() => addAmountProps(item)}>
            <Icon name="plus-circle" size={28} color={Colors.PRIMARY} />
          </TouchableOpacity>
        </View>
      )}
      {type === 'readOnly' && (
        <AppText
          containerStyle={[
            styles.boxAmount,
            {marginRight: Mixin.moderateSize(16)},
          ]}>
          {showProduct.quantity}
        </AppText>
      )}
    </TouchableOpacity>
  );
};
export default CardItem;

const styles = {
  container: {
    backgroundColor: Colors.WHITE,
    flexDirection: 'row',
    height: 80,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: Colors.LIGHT_GREY,
  },
  boxAmount: {
    borderWidth: 1,
    height: 50,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: Colors.PRIMARY,
    textAlign: 'center',
  },
  viewImg: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    width: Mixin.moderateSize(52),
    height: Mixin.moderateSize(52),
    borderRadius: 8,
  },
  leftContent: {
    flex: 3,
    justifyContent: 'center',
  },
  nameProduct: {
    fontWeight: 'bold',
  },

  txtPrice: {
    fontWeight: 'bold',
    color: Colors.GREEN_1,
    marginTop: Mixin.moderateSize(4),
  },
  viewQuantity: {
    width: '32%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: Mixin.moderateSize(12),
  },
};
