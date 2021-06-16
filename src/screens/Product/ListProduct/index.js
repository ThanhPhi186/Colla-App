import React, {useEffect, useState} from 'react';
import {FlatList, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Appbar} from 'react-native-paper';
import {AppText} from '../../../components/atoms';
import {container} from '../../../styles/GlobalStyles';
import {Const, trans} from '../../../utils';
import {images} from '../../../assets';
import {get, post} from '../../../services/ServiceHandle';

import {ItemProduct} from '../../../components/molecules';
import IconCart from '../../../components/molecules/IconCart';
import {useDispatch, useSelector} from 'react-redux';
import {CartRedux} from '../../../redux';

const ListProduct = ({navigation, route}) => {
  const numberProductCart = useSelector(
    state => state.CartReducer.numberProductCart,
  );
  const dispatch = useDispatch();
  const [listProduct, setListProduct] = useState([]);
  const {type} = route.params;

  useEffect(() => {
    const getListProduct = () => {
      get(Const.API.baseURL + Const.API.GetListProduct).then(res => {
        if (res.ok) {
          setListProduct(res.data.data);
        }
      });
    };
    getListProduct();
  }, []);

  const addToCart = item => {
    const dataProduct = {product_id: item.id, amount: 1, type: 'import'};
    post(Const.API.baseURL + Const.API.Cart, dataProduct).then(res => {
      if (res.ok) {
        dispatch(CartRedux.Actions.getCart.request());
      }
    });
  };

  const renderItem = item => {
    return (
      <ItemProduct
        item={item}
        onPress={() => navigation.navigate('DetailProduct', {item})}
        addToCart={() => addToCart(item)}
      />
    );
  };

  return (
    <View style={container}>
      <Appbar.Header>
        <Appbar.BackAction color="white" onPress={() => navigation.goBack()} />
        <Appbar.Content color="white" title={trans('listProduct')} />
        <IconCart
          number={numberProductCart}
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
            paddingVertical: 10,
          }}
        />
      </View>
    </View>
  );
};

export default ListProduct;
