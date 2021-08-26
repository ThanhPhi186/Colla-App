import React, {useEffect, useState} from 'react';
import {FlatList, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Appbar} from 'react-native-paper';
import {AppLoading, AppText} from '../../../components/atoms';
import {container} from '../../../styles/GlobalStyles';
import {Const, trans} from '../../../utils';
import {images} from '../../../assets';
import {get, post} from '../../../services/ServiceHandle';

import {ItemProduct} from '../../../components/molecules';
import IconCart from '../../../components/molecules/IconCart';
import {useDispatch, useSelector} from 'react-redux';
import {CartRedux} from '../../../redux';
import SimpleToast from 'react-native-simple-toast';

const ListProduct = ({navigation, route}) => {
  const numberPurchaseCart = useSelector(
    state => state.CartReducer.numberPurchaseCart,
  );
  const dispatch = useDispatch();
  const [listProduct, setListProduct] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getListProduct = () => {
      setLoading(true);
      get(`${Const.API.baseURL + Const.API.Product}?type=retail`).then(res => {
        if (res.ok) {
          setListProduct(res.data.data);
          setLoading(false);
        } else {
          setLoading(false);
          SimpleToast.show(res.error, SimpleToast.SHORT);
        }
      });
    };
    getListProduct();
  }, []);

  const addToCart = item => {
    const dataProduct = {product_id: item.id, amount: 1, type: 'retail'};
    post(Const.API.baseURL + Const.API.Cart, dataProduct).then(res => {
      if (res.ok) {
        dispatch(CartRedux.Actions.getPurchaseCart.request());
      } else {
        SimpleToast.show(res.error, SimpleToast.SHORT);
      }
    });
  };

  const renderItem = item => {
    return (
      <ItemProduct
        item={item}
        onPress={() => navigation.navigate('DetailProduct', {item})}
        // addToCart={() => addToCart(item)}
      />
    );
  };

  return (
    <View style={container}>
      <AppLoading isVisible={loading} />
      <Appbar.Header>
        <Appbar.BackAction color="white" onPress={() => navigation.goBack()} />
        <Appbar.Content color="white" title={trans('listProduct')} />
        <IconCart
          icon="cart"
          number={numberPurchaseCart}
          onPress={() => navigation.navigate('CartScreen')}
        />
      </Appbar.Header>
      <View style={{flex: 1}}>
        <FlatList
          data={listProduct}
          columnWrapperStyle={{flexWrap: 'wrap'}}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => renderItem(item)}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{
            paddingVertical: 12,
            paddingHorizontal: 8,
          }}
        />
      </View>
    </View>
  );
};

export default ListProduct;
