import React from 'react';
import {FlatList, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Appbar} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {AppText} from '../../../components/atoms';
import {Colors} from '../../../styles';
import {container} from '../../../styles/GlobalStyles';
import {Const, trans} from '../../../utils';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Button} from '../../../components/molecules';
import ProductCartItem from '../Component/ProductCartItem';
import {CartRedux} from '../../../redux';

const CartScreen = ({navigation}) => {
  const dataCart = useSelector(state => state.CartReducer.listProductCart);
  const dispatch = useDispatch();

  const removeCartItem = item => {
    const convertData = dataCart.filter(elm => elm.id !== item.id);
    console.log('xxxxxxx', convertData);
    dispatch(CartRedux.Actions.setListProductCart(convertData));
    dispatch(CartRedux.Actions.setNumberProductCart(-1));
  };

  const renderItem = item => {
    return (
      <ProductCartItem
        item={item}
        removeCartItem={() => removeCartItem(item)}
      />
    );
  };

  return (
    <View style={container}>
      <Appbar.Header>
        <Appbar.BackAction color="white" onPress={() => navigation.goBack()} />
        <Appbar.Content color="white" title={trans('myCart')} />
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
        <AppText style={styles.textPrice}>10000</AppText>
      </View>
      <Button
        containerStyle={styles.btnPurchase}
        title={trans('purchase')}
        onPress={() => navigation.navigate('PaymentScreen')}
      />
    </View>
  );
};

const styles = {
  showPrice: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginTop: 10,
    paddingVertical: 3,
  },
  textPay: {
    fontSize: 17,
    fontWeight: '500',
    color: 'black',
  },
  btnPurchase: {
    bottom: -10,
    width: '100%',
    borderRadius: 0,
  },
  textPrice: {
    color: Colors.GREEN_1,
  },
};

export default CartScreen;
