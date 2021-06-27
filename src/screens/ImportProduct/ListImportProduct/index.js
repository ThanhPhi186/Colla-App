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
import {Colors} from '../../../styles';
import {container} from '../../../styles/GlobalStyles';
import {Const, trans} from '../../../utils';

const ListImportProduct = ({navigation}) => {
  const numberProductCart = useSelector(
    state => state.CartReducer.numberSalesCart,
  );
  const dispatch = useDispatch();
  const refModal = useRef();

  const [listProduct, setListProduct] = useState([]);
  const [visibleModal, setVisibleModal] = useState(false);
  const [itemProduct, setItemProduct] = useState();

  useEffect(() => {
    const getListProduct = () => {
      get(Const.API.baseURL + Const.API.ImportProduct).then(res => {
        if (res.ok) {
          setListProduct(res.data.data);
        }
      });
    };
    getListProduct();
  }, []);

  useEffect(() => {
    dispatch(CartRedux.Actions.getCart.request());
  }, [dispatch]);

  const addToSalesCart = () => {
    const dataProduct = {
      product_id: itemProduct.id,
      amount: refModal.current,
    };
    post(Const.API.baseURL + Const.API.ImportCart, dataProduct).then(res => {
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
        <Appbar.BackAction
          color={Colors.WHITE}
          onPress={() => navigation.goBack()}
        />
        <Appbar.Content
          style={{alignItems: 'center'}}
          color="white"
          title={trans('listProduct')}
        />
        <IconCart
          number={numberProductCart}
          onPress={() => navigation.navigate('SalesCart')}
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
          addToCart={addToSalesCart}
          detailProduct={itemProduct}
          isVisible={visibleModal}
          onBackdropPress={() => setVisibleModal(false)}
        />
      )}
    </View>
  );
};

export default ListImportProduct;
