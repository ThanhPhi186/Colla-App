import React, {useRef, useState} from 'react';
import {FlatList, View} from 'react-native';
import {Appbar} from 'react-native-paper';
import {AppText} from '../../../components/atoms';
import {Button} from '../../../components/molecules';
import {container} from '../../../styles/GlobalStyles';
import {Const, trans} from '../../../utils';
import ProductCartItem from '../../Cart/Component/ProductCartItem';
import styles from './styles';
import numeral from 'numeral';
import {useDispatch, useSelector} from 'react-redux';
import {isEmpty, sum} from 'lodash';
import SimpleToast from 'react-native-simple-toast';
import {deleteApi, put} from '../../../services/ServiceHandle';
import {CartRedux} from '../../../redux';
import ModalChangeQuantity from '../../../components/molecules/ModalChangeQuantity';

const ImportCart = ({navigation}) => {
  const dispatch = useDispatch();
  const dataCart = useSelector(state => state.CartReducer.listImportCart);
  const totalPrice = sum(dataCart?.map(elm => elm.product.price * elm.amount));

  const [visibleModal, setVisibleModal] = useState(false);
  const [itemCart, setItemCart] = useState();
  const refModal = useRef();

  const editCartItem = () => {
    const params = {
      amount: refModal.current,
    };
    put(`${Const.API.baseURL + Const.API.Cart}/${itemCart.id}`, params).then(
      res => {
        if (res.ok) {
          setVisibleModal(false);
          dispatch(CartRedux.Actions.getImportCart.request());
          setTimeout(() => {
            SimpleToast.show('Cập nhật sản phẩm thành công', SimpleToast.SHORT);
          }, 500);
        }
      },
    );
  };

  const removeCartItem = item => {
    deleteApi(`${Const.API.baseURL + Const.API.Cart}/${item.id}`).then(res => {
      if (res.ok) {
        dispatch(CartRedux.Actions.getImportCart.request());
        SimpleToast.show(
          'Xóa sản phẩm khỏi giỏ hàng thành công!',
          SimpleToast.SHORT,
        );
      } else {
        SimpleToast.show(res.error, SimpleToast.SHORT);
      }
    });
  };

  const goPayment = () => {
    if (!isEmpty(dataCart)) {
      navigation.navigate('PaymentScreen', {type: 'import'});
    } else {
      SimpleToast.show('Giỏ hàng trống');
    }
  };

  const renderItem = item => {
    console.log('item', item);
    return (
      <ProductCartItem
        item={item}
        removeCartItem={() => removeCartItem(item)}
        editCartItem={() => {
          setItemCart(item);
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
          title={trans('importCart')}
        />
      </Appbar.Header>
      <View style={container}>
        <FlatList
          data={dataCart}
          renderItem={({item}) => renderItem(item)}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
      <View style={styles.showPrice}>
        <AppText style={styles.textPay}>{trans('totalPayment')}</AppText>
        <AppText style={styles.textPrice}>
          {numeral(totalPrice).format()} đ
        </AppText>
      </View>
      <Button
        containerStyle={styles.btnPurchase}
        title={trans('payment')}
        onPress={goPayment}
      />
      {itemCart && (
        <ModalChangeQuantity
          ref={refModal}
          addToCart={editCartItem}
          detailProduct={itemCart}
          isVisible={visibleModal}
          onBackdropPress={() => setVisibleModal(false)}
        />
      )}
    </View>
  );
};

export default ImportCart;
