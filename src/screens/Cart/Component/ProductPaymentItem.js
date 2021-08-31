import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {AppText} from '../../../components/atoms';
import {Colors} from '../../../styles';
import {Const, trans} from '../../../utils';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import numeral from 'numeral';

const ProductPaymentItem = props => {
  const {item} = props;

  return (
    <View style={styles.containerItem}>
      <View style={styles.left}>
        <FastImage
          source={{
            uri: Const.API.baseUrlImage + item.product?.photos[0]?.photo,
          }}
          style={styles.avt}
        />
      </View>
      {item.product.is_combo ? (
        <View style={styles.right}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingRight: 16,
              flex: 1,
            }}>
            <View style={{justifyContent: 'space-around'}}>
              <AppText style={styles.textName}>{item.product.name}</AppText>
              {item.product.combo_products.length > 0 && (
                <Text style={{flex: 1}}>
                  Tặng kèm:{' '}
                  <Text>
                    {item.product.combo_products
                      .map(elm => elm.name)
                      .join(' + ')}
                  </Text>
                </Text>
              )}
              <AppText style={styles.textPrice}>
                {item.amount} x {numeral(item.product.price).format()} đ
              </AppText>
            </View>
          </View>
        </View>
      ) : (
        <View style={styles.right}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingRight: 16,
              flex: 1,
            }}>
            <View
              style={{
                justifyContent: 'space-around',
              }}>
              <AppText style={styles.textName}>{item.product.name}</AppText>
              <AppText style={styles.textPrice}>
                {item.amount} x {numeral(item.product.price).format()} đ
              </AppText>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = {
  containerItem: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: Colors.LIGHT_GREY,
    marginTop: 12,
  },
  left: {
    width: '25%',
    alignItems: 'center',
    paddingVertical: 10,
  },
  avt: {
    width: '75%',
    aspectRatio: 1 / 1,
    borderRadius: 5,
  },
  textPro: {
    fontSize: 13,
    color: '#888888',
    marginTop: 3,
  },
  right: {
    width: '66%',
    paddingVertical: 10,
    justifyContent: 'space-around',
  },
  textName: {
    fontSize: 16,
    flex: 1,
  },
  icDelete: {
    width: '75%',
    aspectRatio: 1 / 1,
  },
  buttonDel: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 35,
    height: 35,
    position: 'absolute',
    right: 5,
    top: 5,
  },
  textPrice: {
    color: Colors.GREEN_1,
  },
  soluong: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 10,
    alignItems: 'center',
    marginTop: 10,
  },
};
export default ProductPaymentItem;
