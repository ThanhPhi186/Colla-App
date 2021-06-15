import React from 'react';
import {FlatList, View} from 'react-native';
import {Appbar} from 'react-native-paper';
import {AppText} from '../../../components/atoms';
import {Button} from '../../../components/molecules';
import {container} from '../../../styles/GlobalStyles';
import {trans} from '../../../utils';
import ProductCartItem from '../../Cart/Component/ProductCartItem';
import styles from './styles';
import numeral from 'numeral';
import {useSelector} from 'react-redux';
import {isEmpty, sum} from 'lodash';
import SimpleToast from 'react-native-simple-toast';

const SalesCart = ({navigation}) => {
  const dataSalesCart = useSelector(
    state => state.SalesCartReducer.listSalesCart,
  );
  const totalPrice = sum(dataSalesCart?.map(elm => elm.price * elm.amount));

  const goPayment = () => {
    if (!isEmpty(dataSalesCart)) {
      navigation.navigate('PaymentOfSales');
    } else {
      SimpleToast.show('Giỏ hàng trống');
    }
  };

  const renderItem = item => {
    console.log('item', item);
    return (
      <ProductCartItem
        item={item}
        // removeCartItem={() => removeCartItem(item)}
        // editCartItem={() => {
        //   setItemCart(item);
        //   setVisibleModal(true);
        // }}
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
          title={trans('myCart')}
        />
      </Appbar.Header>
      <View style={container}>
        <FlatList
          data={dataSalesCart}
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
        title={trans('purchase')}
        onPress={goPayment}
      />
    </View>
  );
};

export default SalesCart;
