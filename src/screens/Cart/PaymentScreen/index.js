import React, {useState} from 'react';
import {FlatList, ScrollView, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Appbar} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {images} from '../../../assets';
import {AppText} from '../../../components/atoms';
import {Button} from '../../../components/molecules';
import {container} from '../../../styles/GlobalStyles';
import {trans} from '../../../utils';
import ProductPaymentItem from '../Component/ProductPaymentItem';
import styles from './styles';

const PaymentScreen = ({navigation}) => {
  const dataCart = useSelector(state => state.CartReducer.listProductCart);

  const [shipAddress, setShipAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');

  const renderItem = (item, index) => {
    return <ProductPaymentItem key={index} item={item} />;
  };

  return (
    <View style={container}>
      <Appbar.Header>
        <Appbar.BackAction color="white" onPress={() => navigation.goBack()} />
        <Appbar.Content color="white" title={trans('purchase')} />
      </Appbar.Header>

      <ScrollView style={{flex: 1}}>
        <View style={styles.locationArea}>
          <View style={{width: '9%', alignItems: 'center'}}>
            <FastImage
              source={images.avatar}
              style={{width: '70%', aspectRatio: 1 / 1, marginTop: 10}}
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
                <FastImage
                  style={{width: 24, height: 24}}
                  source={images.avatar}
                />
              </TouchableOpacity>
            </View>

            <AppText style={{marginRight: 10, marginTop: 3}}>
              Nguyen Thanh Phi
            </AppText>
            <AppText style={{marginRight: 10, marginTop: 3}}>
              0376871280
            </AppText>
            <AppText style={{marginRight: 10, marginTop: 3}}>
              211 Khuong Trung
            </AppText>
          </View>
        </View>

        <View style={styles.vitien}>
          <View style={{width: '9%', alignItems: 'center'}}>
            <FastImage
              source={images.avatar}
              style={{width: '65%', aspectRatio: 1 / 1, marginTop: 10}}
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

        {dataCart.map((elm, index) => renderItem(elm, index))}

        {/* <FlatList
          data={dataCart}
          renderItem={({item}) => renderItem(item)}
          keyExtractor={(item, index) => index.toString()}
        /> */}
      </ScrollView>
      <View style={styles.showPrice}>
        <AppText style={styles.textPay}>{trans('totalPayment')}</AppText>
        <AppText style={styles.textPrice}>10000</AppText>
      </View>
      <Button
        containerStyle={styles.btnOrdered}
        title={trans('ordered')}
        // onPress={() => navigation.navigate('PaymentScreen')}
      />
    </View>
  );
};

export default PaymentScreen;
