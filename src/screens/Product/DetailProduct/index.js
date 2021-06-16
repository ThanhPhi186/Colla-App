import React, {useRef, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Appbar} from 'react-native-paper';
import {AppText} from '../../../components/atoms';
import {Colors} from '../../../styles';
import {container} from '../../../styles/GlobalStyles';
import {device_height} from '../../../styles/Mixin';
import {Const, trans} from '../../../utils';
import styles from './styles';
import numeral from 'numeral';
import ButtonBottom from '../component/ButtonBottom';

import {useDispatch, useSelector} from 'react-redux';
import {CartRedux} from '../../../redux';
import IconCart from '../../../components/molecules/IconCart';
import {post} from '../../../services/ServiceHandle';
import ModalChangeQuantity from '../../../components/molecules/ModalChangeQuantity';

const DetailProduct = ({navigation, route}) => {
  const numberProductCart = useSelector(
    state => state.CartReducer.numberProductCart,
  );

  const dispatch = useDispatch();
  const {item} = route.params;

  const [visibleModal, setVisibleModal] = useState(false);

  const [type, setType] = useState('');
  const refModal = useRef();

  const addToCart = () => {
    const dataProduct = {
      product_id: item.id,
      amount: refModal.current,
      type: 'import',
    };
    post(Const.API.baseURL + Const.API.Cart, dataProduct).then(res => {
      if (res.ok) {
        dispatch(CartRedux.Actions.getCart.request());
      }
    });

    setVisibleModal(false);
    if (type === 'buyNow') {
      navigation.navigate('CartScreen');
    }
  };

  return (
    <View style={container}>
      <Appbar.Header>
        <Appbar.BackAction color="white" onPress={() => navigation.goBack()} />
        <Appbar.Content color="white" title={trans('detailProduct')} />
        <IconCart
          number={numberProductCart}
          onPress={() => navigation.navigate('CartScreen')}
        />
      </Appbar.Header>
      <View style={container}>
        <View style={{height: device_height / 2.6}}>
          <FastImage
            resizeMode="contain"
            source={{uri: Const.API.baseURL + item.photo}}
            style={container}
          />
        </View>
        <View style={styles.viewInfo}>
          <AppText title>{item.name}</AppText>
          <AppText style={styles.txtPrice} title>
            {numeral(item.price).format()} đ
          </AppText>
        </View>
        <View style={styles.largeIndicate} />
        <View style={styles.boxTitleProduct}>
          <AppText title style={styles.textInfo}>
            {trans('productInfo')}
          </AppText>
          <AppText>
            Áo thun nam cổ tròn với điểm nhấn độc đáo là hàng nút ở ngực áo giúp
            bạn nam linh hoạt điều chỉnh độ thoải mái để phù hợp với từng hoàn
            cảnh khác nhau. Bên cạnh đó, với chức năng kháng khuẩn, áo còn hỗ
            trợ hạn chế các tác nhân gây mùi hôi khó chịu cho chàng tự tin suốt
            ngày dài.
          </AppText>
        </View>
      </View>
      <ButtonBottom
        goCart={() => setVisibleModal(true)}
        goBuyNow={() => {
          setVisibleModal(true);
          setType('buyNow');
        }}
      />
      <ModalChangeQuantity
        ref={refModal}
        addToCart={addToCart}
        detailProduct={item}
        isVisible={visibleModal}
        onBackdropPress={() => setVisibleModal(false)}
      />
    </View>
  );
};

export default DetailProduct;
