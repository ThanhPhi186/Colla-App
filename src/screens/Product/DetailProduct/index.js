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
import ModalChangeQuantity from '../component/ModalChangeQuantity';

import {useDispatch, useSelector} from 'react-redux';
import {CartRedux} from '../../../redux';
import IconCart from '../../../components/molecules/IconCart';

const DetailProduct = ({navigation, route}) => {
  const dispatch = useDispatch();
  const {item} = route.params;
  const dataCart = useSelector(state => state.CartReducer.listProductCart);

  const [visibleModal, setVisibleModal] = useState(false);

  const [count, setCount] = useState(1);

  const [type, setType] = useState('');

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

  const addToCart = () => {
    const dataProduct = {...item, ...{quantity: count}};
    const convertData = [...dataCart];
    convertData.push(dataProduct);
    dispatch(CartRedux.Actions.setListProductCart(convertData));
    dispatch(CartRedux.Actions.setNumberProductCart(1));
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
        <IconCart onPress={() => navigation.navigate('CartScreen')} />
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
        //ref
        count={count}
        onChangeQuantity={onChangeQuantity}
        lessQuantity={lessQuantity}
        addQuantity={addQuantity}
        //end ref
        addToCart={addToCart}
        detailProduct={item}
        isVisible={visibleModal}
        onBackdropPress={() => setVisibleModal(false)}
      />
    </View>
  );
};

export default DetailProduct;
