import React, {useEffect, useRef, useState} from 'react';
import {FlatList, View} from 'react-native';
import {Appbar} from 'react-native-paper';
import SimpleToast from 'react-native-simple-toast';
import {useDispatch, useSelector} from 'react-redux';
import {Button, ItemProduct} from '../../../components/molecules';
import IconCart from '../../../components/molecules/IconCart';
import ModalChangeQuantity from '../../../components/molecules/ModalChangeQuantity';
import {getBottomSpace} from '../../../helpers/iphoneXHelper';
import {CartRedux} from '../../../redux';

import {get, post} from '../../../services/ServiceHandle';
import {Colors, Mixin} from '../../../styles';
import {container} from '../../../styles/GlobalStyles';
import {Const, trans} from '../../../utils';
import styles from './styles';

const ListImportProduct = ({navigation}) => {
  const numberImportCart = useSelector(
    state => state.CartReducer.numberImportCart,
  );
  const dispatch = useDispatch();
  const refModal = useRef();

  const [listProduct, setListProduct] = useState([]);
  const [visibleModal, setVisibleModal] = useState(false);
  const [itemProduct, setItemProduct] = useState();

  useEffect(() => {
    const getListProduct = () => {
      get(`${Const.API.baseURL + Const.API.Product}?type=import`).then(res => {
        if (res.ok) {
          setListProduct(res.data.data);
        }
      });
    };
    getListProduct();
  }, []);

  useEffect(() => {
    dispatch(CartRedux.Actions.getImportCart.request());
  }, [dispatch]);

  const addToImportCard = () => {
    const dataProduct = {
      product_id: itemProduct.id,
      amount: refModal.current,
      type: 'import',
    };
    post(Const.API.baseURL + Const.API.Cart, dataProduct).then(res => {
      if (res.ok) {
        dispatch(CartRedux.Actions.getImportCart.request());
        setVisibleModal(false);
        setTimeout(() => {
          SimpleToast.show('Thêm sản phẩm thành công', SimpleToast.SHORT);
        }, 500);
      } else {
        SimpleToast.show(res.error, SimpleToast.SHORT);
      }
    });
  };

  const goCart = () => {
    navigation.navigate('ImportCart');
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
          number={numberImportCart}
          onPress={() => navigation.navigate('ImportCart')}
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
            paddingHorizontal: 8,
            paddingBottom: Mixin.moderateSize(80),
          }}
        />
      </View>
      {itemProduct && (
        <ModalChangeQuantity
          ref={refModal}
          addToCart={addToImportCard}
          detailProduct={itemProduct}
          isVisible={visibleModal}
          onBackdropPress={() => setVisibleModal(false)}
        />
      )}
      {numberImportCart > 0 && (
        <Button
          containerStyle={styles.btnGoCart}
          title="Đi tới giỏ hàng"
          onPress={goCart}
        />
      )}
    </View>
  );
};

export default ListImportProduct;
