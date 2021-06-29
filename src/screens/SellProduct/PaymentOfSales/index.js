import React, {useCallback, useState} from 'react';
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

const PaymentOfSales = ({navigation, route}) => {
  const {type} = route.params;

  const API_ORDER = type === 'ONLINE' ? Const.API.OnlineOrder : Const.API.Order;

  const dispatch = useDispatch();

  const dataSalesProducts = useSelector(state =>
    type === 'ONLINE'
      ? state.CartReducer.listCartOnline
      : state.CartReducer.listSalesCart,
  );

  const totalPrice = sum(
    dataSalesProducts?.map(elm => elm.product.price * elm.amount),
  );

  const [customer, setCustomer] = useState();

  const chooseCustomer = item => {
    setCustomer(item);
  };

  const orderPayment = () => {
    if (!customer) {
      return SimpleToast.show('Vui lòng chọn khách hàng', SimpleToast.SHORT);
    }

    const carts = dataSalesProducts.map(elm => elm.id);

    const params = {
      phone: customer.phone,
      address_ship: customer.address_ship,
      fullname: customer.fullname,
      payment_method: 'cod',
      ship_method: '',
      carts,
    };
    post(Const.API.baseURL + API_ORDER, params).then(res => {
      if (res.ok) {
        dispatch(
          type === 'ONLINE'
            ? CartRedux.Actions.getOnlineCart.request()
            : CartRedux.Actions.getSalesCart.request(),
        );
        SimpleToast.show('Lên đơn thành công', SimpleToast.SHORT);
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
                Khách hàng
              </AppText>
              <TouchableOpacity
                style={{width: 30, aspectRatio: 1 / 1}}
                onPress={() =>
                  navigation.navigate('ListSalesCustomer', {
                    chooseCustomer,
                  })
                }>
                <Icon
                  name="square-edit-outline"
                  size={24}
                  color={Colors.GRAY}
                />
              </TouchableOpacity>
            </View>

            {customer && (
              <>
                <AppText style={{marginRight: 10, marginTop: 3}}>
                  {customer?.fullname}
                </AppText>
                <AppText style={{marginRight: 10, marginTop: 3}}>
                  {customer?.phone}
                </AppText>
                <AppText style={{marginRight: 10, marginTop: 3}}>
                  {customer?.address_ship}
                </AppText>
              </>
            )}
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
