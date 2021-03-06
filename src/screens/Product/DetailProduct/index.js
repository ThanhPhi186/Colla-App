import React, {useRef, useState} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
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
import SimpleToast from 'react-native-simple-toast';

const DetailProduct = ({navigation, route}) => {
  const numberPurchaseCart = useSelector(
    state => state.CartReducer.numberPurchaseCart,
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
      type: 'retail',
    };
    post(Const.API.baseURL + Const.API.Cart, dataProduct).then(res => {
      if (res.ok) {
        setVisibleModal(false);
        dispatch(CartRedux.Actions.getPurchaseCart.request());
        if (type === 'buyNow') {
          navigation.navigate('CartScreen');
        }
      } else {
        setVisibleModal(false);
        setTimeout(() => {
          SimpleToast.show(res.error, SimpleToast.SHORT);
        }, 700);
      }
    });
  };

  const renderProductInfo = () => {
    return (
      <View>
        <AppText title style={styles.textInfo}>
          {trans('productInfo')}
        </AppText>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <AppText>S??? l?????ng trong kho:</AppText>
          <AppText>{item.quantity}</AppText>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <AppText>Th????ng hi???u:</AppText>
          <AppText>{item.product_brand_id.name}</AppText>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <AppText>Xu???t x???:</AppText>
          <AppText>Vi???t Nam</AppText>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <AppText>Danh m???c s???n ph???m:</AppText>
          <AppText>
            {item.categories
              .map(elm => elm.product_category_id.name)
              .join(' , ')}
          </AppText>
        </View>
      </View>
    );
  };

  return (
    <View style={container}>
      <Appbar.Header>
        <Appbar.BackAction color="white" onPress={() => navigation.goBack()} />
        <Appbar.Content color="white" title={trans('detailProduct')} />
        <IconCart
          icon="cart"
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
            {numeral(item.price).format()} ??
          </AppText>
        </View>
        {item.combo_products.length > 0 && (
          <>
            <View style={styles.largeIndicate} />
            <View style={styles.boxTitleProduct}>
              <AppText title style={styles.textInfo}>
                S???n ph???m t???ng k??m
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
                  </View>
                );
              })}
            </View>
          </>
        )}
        <View style={styles.largeIndicate} />
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: 48}}
          style={styles.boxTitleProduct}>
          {renderProductInfo()}
          <AppText title style={styles.textInfo}>
            {trans('description')}
          </AppText>
          <AppText>{item.description}</AppText>
        </ScrollView>
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
