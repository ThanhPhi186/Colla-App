import React, {useState} from 'react';
import {FlatList, TouchableOpacity, View} from 'react-native';
import {Appbar} from 'react-native-paper';
import {container} from '../../../styles/GlobalStyles';
import {Const, trans} from '../../../utils';
import styles from './styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Colors} from '../../../styles';
import {AppText} from '../../../components/atoms';

import numeral from 'numeral';
import {Button} from '../../../components/molecules';
import ProductPaymentItem from '../../Cart/Component/ProductPaymentItem';
import {sum} from 'lodash';
import SimpleToast from 'react-native-simple-toast';
import {post} from '../../../services/ServiceHandle';

const PaymentOfSales = ({navigation, route}) => {
  const {type} = route.params;
  const {dataProducts} = route.params;

  const totalPrice = sum(dataProducts?.map(elm => elm.price * elm.amount));

  const [customer, setCustomer] = useState();

  const chooseCustomer = item => {
    setCustomer(item);
  };

  const orderPayment = () => {
    if (!customer) {
      return SimpleToast.show('Vui lòng chọn khách hàng', SimpleToast.SHORT);
    }

    const products = dataProducts.map(elm => {
      return {
        product_id: elm.id,
        amount: elm.amount,
      };
    });

    const params = {
      phone: `+84${Number(customer.phone)}`,
      address_ship: customer.address_ship,
      fullname: customer.fullname,
      payment_method: 'cod',
      ship_method: '',
      products,
      type,
    };
    post(Const.API.baseURL + Const.API.Order, params).then(res => {
      if (res.ok) {
        SimpleToast.show('Lên đơn thành công', SimpleToast.SHORT);
        navigation.navigate('SalesHistory', {type});
      } else {
        SimpleToast.show(res.error, SimpleToast.SHORT);
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
          title={trans('payment')}
        />
      </Appbar.Header>
      <View style={{flex: 1}}>
        <View style={styles.locationArea}>
          <View style={{flex: 1, paddingVertical: 10}}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('ListSalesCustomer', {
                  chooseCustomer,
                })
              }
              style={{
                width: '100%',
                justifyContent: 'space-between',
                flexDirection: 'row',
              }}>
              <View style={{flexDirection: 'row'}}>
                <View>
                  <AppText
                    style={{
                      fontSize: 17,
                      fontWeight: '500',
                      color: 'black',
                    }}>
                    {customer ? trans('customer') : trans('chooseCustomer')} :
                  </AppText>
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
              {customer && (
                <Icon
                  name="square-edit-outline"
                  size={24}
                  color={Colors.GRAY}
                />
              )}
            </TouchableOpacity>
          </View>
        </View>

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
          data={dataProducts}
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
