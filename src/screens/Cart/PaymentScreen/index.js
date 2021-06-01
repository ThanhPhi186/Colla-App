import React, {useState} from 'react';
import {FlatList, ScrollView, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Appbar} from 'react-native-paper';
import SimpleToast from 'react-native-simple-toast';
import {useDispatch, useSelector} from 'react-redux';
import {images} from '../../../assets';
import {AppText} from '../../../components/atoms';
import {Button} from '../../../components/molecules';
import {CartRedux} from '../../../redux';
import {post} from '../../../services/ServiceHandle';
import {container} from '../../../styles/GlobalStyles';
import {Const, trans} from '../../../utils';
import ProductPaymentItem from '../Component/ProductPaymentItem';
import styles from './styles';
import numeral from 'numeral';
import {sum} from 'lodash';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Colors} from '../../../styles';

const PaymentScreen = ({navigation}) => {
  const dataCart = useSelector(state => state.CartReducer.listProductCart);

  const userInfo = useSelector(state => state.AuthenOverallReducer.userAuthen);

  console.log('userInfo', userInfo);

  const dataAddress = userInfo?.addresses?.filter(elm => elm.is_default)[0];

  const totalPrice = sum(dataCart.map(elm => elm.product.price * elm.amount));

  const dispatch = useDispatch();

  const orderPayment = () => {
    if (!dataAddress) {
      return SimpleToast.show('Chưa có địa chỉ nhận hàng', SimpleToast.SHORT);
    }
    const carts = dataCart.map(elm => elm.id);
    console.log('carts', carts);
    const params = {
      phone: dataAddress.phone,
      address_ship: dataAddress.address,
      fullname: dataAddress.fullname,
      payment_method: 'cod',
      ship_method: '',
      carts,
    };
    post(Const.API.baseURL + Const.API.Order, params).then(res => {
      if (res.ok) {
        dispatch(CartRedux.Actions.getCart.request());
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
        <Appbar.Content color="white" title={trans('purchase')} />
      </Appbar.Header>

      <View style={{flex: 1}}>
        <View style={styles.locationArea}>
          <View style={{width: '9%', alignItems: 'center'}}>
            <Icon
              name="map-marker"
              size={24}
              style={{marginTop: 10}}
              color={Colors.GRAY}
            />
          </View>

          <View style={{flex: 1, paddingVertical: 10}}>
            <View
              style={{
                width: '100%',
                justifyContent: 'space-between',
                flexDirection: 'row',
              }}>
              <AppText
                style={{fontSize: 17, fontWeight: '500', color: 'black'}}>
                {trans('shippingAddress')}
              </AppText>
              <TouchableOpacity
                style={{width: 30, aspectRatio: 1 / 1}}
                onPress={() => navigation.navigate('DeliveryAddressScreen')}>
                <Icon
                  name="square-edit-outline"
                  size={24}
                  color={Colors.GRAY}
                />
              </TouchableOpacity>
            </View>

            <AppText style={{marginRight: 10, marginTop: 3}}>
              {dataAddress?.fullname}
            </AppText>
            <AppText style={{marginRight: 10, marginTop: 3}}>
              {dataAddress?.phone}
            </AppText>
            <AppText style={{marginRight: 10, marginTop: 3}}>
              {dataAddress?.address}
            </AppText>
          </View>
        </View>

        <View style={styles.vitien}>
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
        </View>

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
        containerStyle={styles.btnOrdered}
        title={trans('ordered')}
        onPress={orderPayment}
      />
    </View>
  );
};

export default PaymentScreen;
