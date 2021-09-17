import React, {useState} from 'react';
import {FlatList, ScrollView, TouchableOpacity, View, Text} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Appbar, Switch} from 'react-native-paper';
import SimpleToast from 'react-native-simple-toast';
import {useDispatch, useSelector} from 'react-redux';
import {images} from '../../../assets';
import {AppLoading, AppText} from '../../../components/atoms';
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

const PaymentScreen = ({navigation, route}) => {
  const {type} = route.params;
  const {dataProducts} = route.params;

  const dataCart = useSelector(state =>
    type === 'retail' ? state.CartReducer.listPurchaseCart : dataProducts,
  );

  const userInfo = useSelector(state => state.AuthenOverallReducer.userAuthen);

  const [usePoint, setUsePoint] = useState(false);
  const [loading, setLoading] = useState(false);

  const dataAddress = userInfo?.addresses?.filter(elm => elm.is_default)[0];

  const sumPrice = sum(dataCart.map(elm => elm.product.price * elm.amount));
  const sumRetailPrice = sum(dataCart.map(elm => elm.product.retail_price * elm.amount));

  const shippingFee = dataCart.reduce((total, elm) => total > elm.product.shipping_fee ? total : elm.product.shipping_fee, 0);

  const dispatch = useDispatch();

  const orderPayment = () => {
    if (!dataAddress) {
      return SimpleToast.show('Chưa có địa chỉ nhận hàng', SimpleToast.SHORT);
    }
    if (type === 'import' && userInfo.point < sumPrice) {
      return SimpleToast.show(
        'Số tiền của bạn chưa đủ để nhập hàng',
        SimpleToast.SHORT,
      );
    }

    setLoading(true);

    const products = dataCart.map(elm => {
      return {
        product_id: elm.id,
        amount: elm.amount,
      };
    });

    const carts = dataCart.map(elm => elm.id);

    const params = {
      phone: dataAddress.phone,
      address_ship: dataAddress.address,
      fullname: dataAddress.fullname,
      payment_method:
        type === 'retail' ? (usePoint ? 'point' : 'cod') : 'point',
      ship_method: '',
      type,
      district: dataAddress.district,
      province: dataAddress.province,
      ward: dataAddress.ward,
    };

    type === 'retail' ? (params.carts = carts) : (params.products = products);

    post(Const.API.baseURL + Const.API.Order, params).then(res => {
      if (res.ok) {
        dispatch(CartRedux.Actions.getPurchaseCart.request());
        setLoading(false);
        setTimeout(() => {
          SimpleToast.show('Đặt hàng thành công', SimpleToast.SHORT);
          navigation.reset({
            index: 0,
            routes: [
              {name: type === 'retail' ? trans('home') : trans('personal')},
            ],
          });
        }, 700);
      } else {
        setLoading(false);
        setTimeout(() => {
          SimpleToast.show(res.error, SimpleToast.SHORT);
        }, 700);
      }
    });
  };

  const changePaymentMethod = () => {
    if (userInfo.point < sumPrice) {
      SimpleToast.show(
        'Số điểm của bạn không đủ để thanh toán',
        SimpleToast.SHORT,
      );
    } else {
      setUsePoint(!usePoint);
    }
  };

  const renderItem = item => {
    return <ProductPaymentItem item={item} showRetailPrice={type == 'import'} />;
  };

  return (
    <View style={container}>
      <AppLoading isVisible={loading} />
      <Appbar.Header>
        <Appbar.BackAction color="white" onPress={() => navigation.goBack()} />
        <Appbar.Content color="white" title={trans('payment')} />
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
          <View
            style={{flex: 1, paddingVertical: 10}}
            // onPress={() => navigation.navigate('Recharge')}
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
            {type === 'retail' ? (
              <View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: '94%',
                    alignItems: 'center',
                  }}>
                  <AppText>Thanh toán khi nhận hàng (COD)</AppText>
                  <Switch
                    onValueChange={changePaymentMethod}
                    value={!usePoint}
                    trackColor="#0187E0"
                    thumbColor={Colors.WHITE}
                    ios_backgroundColor={Colors.WHITE_SMOKE}
                  />
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: '94%',
                    alignItems: 'center',
                    marginTop: 8,
                  }}>
                  <View>
                    <AppText>
                      Thanh toán bằng điểm
                    </AppText>
                    <AppText style={{fontSize:12}}>
                      (Bạn đang có {numeral(userInfo.point).format()} điểm)
                    </AppText>
                  </View>
                  <Switch
                    onValueChange={changePaymentMethod}
                    value={usePoint}
                    trackColor="#0187E0"
                    thumbColor={Colors.WHITE}
                    ios_backgroundColor={Colors.WHITE_SMOKE}
                    disabled={userInfo.point < sumPrice}
                  />
                </View>
              </View>
            ) : (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <View>
                  <AppText>
                    Thanh toán bằng điểm
                  </AppText>
                  <AppText style={{fontSize:12}}>
                    (Bạn đang có {numeral(userInfo.point).format()} điểm)
                  </AppText>
                </View>
                <TouchableOpacity
                  onPress={() => navigation.navigate('Recharge')}
                  style={{
                    backgroundColor: 'green',
                    padding: 8,
                    borderRadius: 8,
                    marginRight: 8,
                  }}>
                  <AppText
                    style={{
                      color: 'white',
                    }}>
                    Nạp tiền
                  </AppText>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>

        <FlatList
          data={dataCart}
          renderItem={({item}) => renderItem(item)}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>

      <View style={styles.largeIndicate} />
      <View style={[styles.showPrice, { paddingVertical: 1 }]}>
        <AppText style={[styles.textPay, { fontSize: 14 }]}>Tổng tiền hàng</AppText>
        <AppText style={[styles.textPrice, { fontSize: 12 }]}>
          {numeral(type != 'import' ? sumPrice : sumRetailPrice).format()} đ
        </AppText>
      </View>
      {type != 'import' && (
        <View style={[styles.showPrice, { paddingVertical: 1 }]}>
          <AppText style={[styles.textPay, { fontSize: 14 }]}>Phí ship</AppText>
          <AppText style={[styles.textPrice, { fontSize: 12 }]}>
            {numeral(shippingFee).format()} đ
          </AppText>
        </View>
      )}
      {type == 'import' && (
        <View style={[styles.showPrice, { paddingVertical: 1 }]}>
          <AppText style={[styles.textPay, { fontSize: 14 }]}>Chiết khấu</AppText>
          <AppText style={[styles.textPrice, { fontSize: 12 }]}>
            - {numeral(sumRetailPrice - sumPrice).format()} đ
          </AppText>
        </View>
      )}
      <View style={styles.showPrice}>
        <AppText style={styles.textPay}>{trans('totalPayment')}</AppText>
        <AppText style={styles.textPrice}>
          {numeral(sumPrice + (type != 'import' ? shippingFee : 0)).format()} đ
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
