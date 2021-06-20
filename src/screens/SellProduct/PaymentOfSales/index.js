import React, {useState} from 'react';
import {FlatList, TouchableOpacity, View} from 'react-native';
import {Appbar, TextInput} from 'react-native-paper';
import {container} from '../../../styles/GlobalStyles';
import {Const, trans} from '../../../utils';
import styles from './styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Colors} from '../../../styles';
import {AppText} from '../../../components/atoms';
import {useDispatch, useSelector} from 'react-redux';
import numeral from 'numeral';
import {Button} from '../../../components/molecules';
import ProductPaymentItem from '../../Cart/Component/ProductPaymentItem';
import {sum} from 'lodash';
import SimpleToast from 'react-native-simple-toast';
import {post} from '../../../services/ServiceHandle';
import {CartRedux} from '../../../redux';

const PaymentOfSales = ({navigation}) => {
  const dispatch = useDispatch();
  const dataSalesProducts = useSelector(
    state => state.CartReducer.listSalesCart,
  );
  const totalPrice = sum(
    dataSalesProducts?.map(elm => elm.product.price * elm.amount),
  );

  const [fullname, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  const handelCheckValue = () => {
    const regex =
      /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/;
    if (!fullname) {
      SimpleToast.show('Tên người nhận không được để trống', SimpleToast.SHORT);
      return true;
    }
    if (!regex.test(phone)) {
      SimpleToast.show('Số điện thoại không đúng định dạng', SimpleToast.SHORT);
      return true;
    }
    if (!address) {
      SimpleToast.show('Địa chỉ không được để trống', SimpleToast.SHORT);
      return true;
    }

    return false;
  };

  const orderPayment = () => {
    if (handelCheckValue()) {
      return;
    }

    const carts = dataSalesProducts.map(elm => elm.id);

    const params = {
      phone,
      address_ship: address,
      fullname,
      payment_method: 'cod',
      ship_method: '',
      carts,
    };
    post(Const.API.baseURL + Const.API.Order, params).then(res => {
      if (res.ok) {
        dispatch(CartRedux.Actions.getSalesCart.request());
        SimpleToast.show('Đặt hàng thành công', SimpleToast.SHORT);
        navigation.popToTop();
      }
    });
  };

  const renderItem = item => {
    return <ProductPaymentItem item={item} />;
  };

  return (
    <View style={container}>
      <Appbar.Header>
        <Appbar.BackAction color="white" onPress={() => navigation.goBack()} />
        <Appbar.Content
          style={{alignItems: 'center'}}
          color="white"
          title={trans('purchase')}
        />
      </Appbar.Header>
      <View style={{flex: 1}}>
        <View style={styles.locationArea}>
          <View style={{flex: 1, marginTop: 10, marginBottom: 20}}>
            <View
              style={{
                width: '100%',
                justifyContent: 'space-between',
                flexDirection: 'row',
              }}>
              <AppText
                style={{fontSize: 17, fontWeight: '500', color: 'black'}}>
                {trans('customerInfo')}
              </AppText>
            </View>

            <TextInput
              style={{
                backgroundColor: Colors.WHITE,
              }}
              conta
              label={trans('recipientName')}
              value={fullname}
              onChangeText={setFullName}
            />
            <TextInput
              style={{backgroundColor: Colors.WHITE}}
              label={trans('phoneNumber')}
              value={phone}
              onChangeText={setPhone}
            />

            <TextInput
              style={{backgroundColor: Colors.WHITE}}
              label={trans('deliveryAddress')}
              value={address}
              onChangeText={setAddress}
            />
          </View>
        </View>

        {/* <View style={styles.vitien}>
          <View style={{width: '9%', alignItems: 'center'}}>
            <Icon
              name="credit-card"
              size={24}
              style={{marginTop: 10}}
              color={Colors.GRAY}
            />
          </View>

          <TouchableOpacity
            style={{flex: 1, paddingVertical: 10}}
            // onPress={this.onHandleMethod}
          >
            <View
              style={{
                width: '100%',
                justifyContent: 'space-between',
                flexDirection: 'row',
              }}>
              <AppText
                style={{fontSize: 17, fontWeight: '500', color: 'black'}}>
                {trans('paymentMethods')}
              </AppText>
            </View>
            <AppText style={{marginRight: 10}}>
              {trans('paymentOnDelivery')} ({trans('excludingShippingCharges')})
            </AppText>
          </TouchableOpacity>
        </View> */}
        <AppText
          style={{
            fontSize: 17,
            fontWeight: '500',
            color: 'black',
            marginTop: 12,
            marginLeft: 12,
          }}>
          {trans('orderInfo')}
        </AppText>

        <FlatList
          data={dataSalesProducts}
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
        containerStyle={styles.btnOrdered}
        title={trans('confirm')}
        onPress={orderPayment}
      />
    </View>
  );
};

export default PaymentOfSales;
