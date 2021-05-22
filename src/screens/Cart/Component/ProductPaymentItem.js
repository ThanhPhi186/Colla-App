import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {AppText} from '../../../components/atoms';
import {Colors} from '../../../styles';
import {Const, trans} from '../../../utils';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ProductPaymentItem = props => {
  const {item} = props;
  return (
    <View style={styles.containerItem}>
      <View style={styles.left}>
        <FastImage
          source={{uri: Const.API.baseURL + item.photo}}
          style={styles.avt}
        />
      </View>
      <View style={styles.right}>
        <AppText style={styles.textName}>{item.name}</AppText>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingRight: 16,
          }}>
          <AppText style={styles.textPrice}>{item.price}đ</AppText>
          <AppText style={styles.textPrice}>X{item.quantity}</AppText>
        </View>
      </View>
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
    width: '75%',
    paddingVertical: 10,
    justifyContent: 'space-around',
  },
  textName: {
    fontSize: 16,
    flex: 1,
    marginRight: 40,
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
