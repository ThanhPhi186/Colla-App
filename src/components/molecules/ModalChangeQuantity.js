import React, {forwardRef, useEffect, useState} from 'react';
import {TextInput, TouchableOpacity, View} from 'react-native';
import {AppText} from '../atoms';
import Modal from 'react-native-modal';
import FastImage from 'react-native-fast-image';
import {Const, trans} from '../../utils';
import {Colors} from '../../styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {device_width} from '../../styles/Mixin';
import {Button} from '.';

const ModalChangeQuantity = forwardRef((props, ref) => {
  const {detailProduct, addToCart} = props;

  const [count, setCount] = useState(detailProduct.amount || 1);

  useEffect(() => {
    ref.current = count;
  }, [count, ref]);

  const addQuantity = () => {
    if (count < 10) {
      setCount(count + 1);
    }
  };

  const lessQuantity = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const onChangeQuantity = txt => {
    setCount(Number(txt));
  };

  const viewChangeQuantity = () => {
    return (
      <View style={styles.container}>
        <AppText style={styles.textTitle}>{trans('quantity')} :</AppText>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}>
          <TouchableOpacity onPress={addQuantity}>
            <Icon name="menu-up" size={40} color={Colors.PRIMARY} />
          </TouchableOpacity>
          <TextInput
            onChangeText={onChangeQuantity}
            style={styles.textInput}
            keyboardType="numeric">
            {count}
          </TextInput>

          <TouchableOpacity onPress={lessQuantity}>
            <Icon name="menu-down" size={40} color={Colors.PRIMARY} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <Modal
      style={{margin: 0, justifyContent: 'flex-end'}}
      avoidKeyboard
      {...props}>
      <View style={styles.content}>
        <View style={styles.avatar}>
          <FastImage
            source={{
              uri:
                Const.API.baseURL +
                (detailProduct.photo || detailProduct.product.photo),
            }}
            style={styles.images}
          />
          <View style={{flex: 1, paddingLeft: 10}}>
            <AppText style={styles.textName} numberOfLines={2}>
              {detailProduct.name || detailProduct.product.name}
            </AppText>
            <View style={{}}>
              <AppText style={styles.price}>
                {detailProduct.price || detailProduct.product.price}đ
              </AppText>
            </View>

            <AppText style={styles.textKho}>
              {trans('quantityInStock')}:{' '}
              {detailProduct.quantity || detailProduct.product.quantity}
            </AppText>
          </View>
        </View>
        {viewChangeQuantity()}

        <Button
          onPress={addToCart}
          containerStyle={{alignSelf: 'center'}}
          title={trans('addToCard')}
        />
      </View>
    </Modal>
  );
});

const styles = {
  content: {
    width: device_width,
    paddingVertical: 15,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    backgroundColor: 'white',
  },
  avatar: {
    width: '100%',
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 16,
    paddingTop: 10,
  },
  images: {
    width: 80,
    height: 80,
  },
  textName: {
    marginRight: 25,
    fontSize: 16,
    color: 'black',
  },
  price: {
    color: Colors.GREEN_1,
    fontSize: 16,
    fontWeight: '500',
    marginTop: 5,
    marginRight: 14,
  },
  textKho: {
    fontSize: 16,
    marginTop: 5,
    color: '#888888',
  },
  button: {
    width: '92%',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.PRIMARY,
    alignSelf: 'center',
    marginBottom: 10,
    bottom: 10,
  },
  container: {
    flexDirection: 'row',
    width: device_width,
    alignItems: 'center',
    paddingVertical: 15,
    paddingLeft: 12,
  },
  textTitle: {
    fontSize: 16,
    color: '#888888',
    paddingHorizontal: 10,
  },
  textInput: {
    width: 65,
    height: 25,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#EEEEEE',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    padding: 0,
    color: '#333333',
  },
};

export default ModalChangeQuantity;
