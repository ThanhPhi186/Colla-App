import React, {useRef, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Appbar} from 'react-native-paper';
import {AppText} from '../../../components/atoms';
import {Colors, Mixin} from '../../../styles';
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
import ImageSlider from 'react-native-image-slider';
import CardItem from '../../../components/molecules/CardItem';
import {images} from '../../../assets';

const DetailProduct = ({navigation, route}) => {
  const numberPurchaseCart = useSelector(
    state => state.CartReducer.numberPurchaseCart,
  );

  const dispatch = useDispatch();
  const {item} = route.params;

  console.log(
    'itemteim',
    item.photos.map(elm => Const.API.baseUrlImage + elm.photo),
  );

  const [visibleModal, setVisibleModal] = useState(false);

  const [type, setType] = useState('');
  const refModal = useRef();

  const addToCart = () => {
    const dataProduct = {
      product_id: item.id,
      amount: refModal.current,
      type: 'retail',
    };
    post(Const.API.baseURL + Const.API.Cart, dataProduct).then(res => {
      if (res.ok) {
        dispatch(CartRedux.Actions.getPurchaseCart.request());
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
          number={numberPurchaseCart}
          onPress={() => navigation.navigate('CartScreen')}
        />
      </Appbar.Header>
      <View style={container}>
        <View style={{height: device_height / 2.6}}>
          {item.photos.length > 1 ? (
            <ImageSlider
              loopBothSides
              autoPlayWithInterval={3000}
              images={item.photos.map(
                elm => Const.API.baseUrlImage + elm.photo,
              )}
              customSlide={({index, item, style, width}) => (
                <View key={index} style={[style, {backgroundColor: 'white'}]}>
                  <FastImage
                    resizeMode="contain"
                    source={{uri: item}}
                    style={{flex: 1}}
                  />
                </View>
              )}
            />
          ) : (
            <FastImage
              resizeMode="contain"
              source={{uri: Const.API.baseUrlImage + item?.photos[0]?.photo}}
              style={container}
            />
          )}
        </View>
        <View style={styles.viewInfo}>
          <AppText title>{item.name}</AppText>
          <AppText style={styles.txtPrice} title>
            {numeral(item.price).format()} đ
          </AppText>
        </View>
        {item.combo_products.length > 0 && (
          <>
            <View style={styles.largeIndicate} />
            <View style={styles.boxTitleProduct}>
              <AppText title style={styles.textInfo}>
                Sản phẩm tặng kèm
              </AppText>
              {item.combo_products.map((elm, index) => {
                return (
                  <View key={index} style={styles.container}>
                    <View style={styles.viewImg}>
                      <FastImage
                        resizeMode="contain"
                        style={styles.img}
                        source={
                          item.photos.length > 0
                            ? {
                                uri:
                                  Const.API.baseUrlImage +
                                  item?.photos[0]?.photo,
                              }
                            : images.noImage
                        }
                      />
                    </View>
                    <View style={styles.leftContent}>
                      <AppText style={styles.nameProduct}>{elm.name}</AppText>
                    </View>
                    {/* <AppText
                      containerStyle={[
                        styles.boxAmount,
                        {marginRight: Mixin.moderateSize(16)},
                      ]}>
                      {elm.quantity}
                    </AppText> */}
                  </View>
                );
              })}
            </View>
          </>
        )}
        <View style={styles.largeIndicate} />
        <View style={styles.boxTitleProduct}>
          <AppText title style={styles.textInfo}>
            {trans('productInfo')}
          </AppText>
          <AppText>{item.description}</AppText>
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
