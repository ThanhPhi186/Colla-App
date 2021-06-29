import React, {useEffect, useRef, useState} from 'react';
import {FlatList, View} from 'react-native';
import {Appbar} from 'react-native-paper';
import SimpleToast from 'react-native-simple-toast';
import {useDispatch, useSelector} from 'react-redux';
import {ItemProduct} from '../../../components/molecules';
import IconCart from '../../../components/molecules/IconCart';
import ModalChangeQuantity from '../../../components/molecules/ModalChangeQuantity';
import {CartRedux} from '../../../redux';

import {get, post} from '../../../services/ServiceHandle';
import {container} from '../../../styles/GlobalStyles';
import {Const, trans} from '../../../utils';

const ListSalesProduct = ({navigation, route}) => {
  const {type} = route.params;

  const numberProductCart = useSelector(state =>
    type === 'ONLINE'
      ? state.CartReducer.numberCartOnline
      : state.CartReducer.numberSalesCart,
  );

  console.log('numberProductCart', numberProductCart);

  const dispatch = useDispatch();
  const refModal = useRef();

  const [listProduct, setListProduct] = useState([]);
  const [visibleModal, setVisibleModal] = useState(false);
  const [itemProduct, setItemProduct] = useState();

  useEffect(() => {
    const apiGetProduct =
      type === 'ONLINE' ? Const.API.OnlineProduct : Const.API.GetListProduct;
    const getListProduct = () => {
      get(Const.API.baseURL + apiGetProduct).then(res => {
        if (res.ok) {
          setListProduct(res.data.data);
        }
      });
    };
    getListProduct();
  }, [type]);

  useEffect(() => {
    type === 'ONLINE'
      ? dispatch(CartRedux.Actions.getOnlineCart.request())
      : dispatch(CartRedux.Actions.getSalesCart.request());
  }, [dispatch, type]);

  const addToSalesCart = () => {
    const dataProduct = {
      product_id: itemProduct.id,
      amount: refModal.current,
    };
    post(Const.API.baseURL + Const.API.Cart, dataProduct).then(res => {
      if (res.ok) {
        dispatch(CartRedux.Actions.getSalesCart.request());
        setVisibleModal(false);
        setTimeout(() => {
          SimpleToast.show('Thêm sản phẩm thành công', SimpleToast.SHORT);
        }, 500);
      } else {
        SimpleToast.show(res.error, SimpleToast.SHORT);
      }
    });
  };

  const addToOnlineCart = () => {
    const dataProduct = {
      product_id: itemProduct.id,
      amount: refModal.current,
    };
    post(Const.API.baseURL + Const.API.OnlineCart, dataProduct).then(res => {
      if (res.ok) {
        dispatch(CartRedux.Actions.getOnlineCart.request());
        setVisibleModal(false);
        setTimeout(() => {
          SimpleToast.show('Thêm sản phẩm thành công', SimpleToast.SHORT);
        }, 500);
      } else {
        SimpleToast.show(res.error, SimpleToast.SHORT);
      }
    });
  };

  const renderItem = item => {
    return (
      <ItemProduct
        disabled
        item={item}
        // onPress={() => navigation.navigate('DetailProduct', {item})}
        addToCart={() => {
          setItemProduct(item);
          setVisibleModal(true);
        }}
      />
    );
  };

  return (
    <View style={container}>
      <Appbar.Header>
        <Appbar.BackAction color="white" onPress={() => navigation.goBack()} />
        <Appbar.Content
          style={{alignItems: 'center'}}
          color="white"
          title={type === 'ONLINE' ? 'Lên đơn online' : 'Lên đơn offline'}
        />
        <IconCart
          number={numberProductCart}
          onPress={() => navigation.navigate('SalesCart', {type})}
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
      {itemProduct && (
        <ModalChangeQuantity
          ref={refModal}
          addToCart={type === 'ONLINE' ? addToOnlineCart : addToSalesCart}
          detailProduct={itemProduct}
          isVisible={visibleModal}
          onBackdropPress={() => setVisibleModal(false)}
        />
      )}
    </View>
  );
};

export default ListSalesProduct;
