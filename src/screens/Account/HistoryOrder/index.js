import React from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import {Appbar} from 'react-native-paper';
import {AppText} from '../../../components/atoms';
import {Colors} from '../../../styles';
import {container} from '../../../styles/GlobalStyles';
import {trans} from '../../../utils';
import numeral from 'numeral';

const dataOrder = [
  {
    id: 'DH001',
    price: 180000,
    products: [
      {
        name: 'Ao Phong nam',
        amount: 2,
      },
      {
        name: 'Ao Phong nu',
        amount: 5,
      },
    ],
  },
];
const HistoryOrder = ({navigation}) => {
  const renderItem = ({item}) => {
    return (
      <View
        style={{
          alignSelf: 'center',
          width: '90%',
          backgroundColor: Colors.WHITE,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
          paddingHorizontal: 8,
          paddingVertical: 16,
          marginTop: 16,
        }}>
        <AppText>Mã đơn hàng : {item.id}</AppText>
        <View style={{flexDirection: 'row'}}>
          <AppText>Sản phẩm: </AppText>
          <View>
            <AppText />
            {item.products.map((elm, index) => {
              return (
                <AppText key={index}>
                  - {elm.name} x {elm.amount}
                </AppText>
              );
            })}
          </View>
        </View>
        <View style={{alignItems: 'flex-end'}}>
          <AppText style={{color: Colors.GREEN_1}}>
            Tổng: {numeral(item.price).format()} đ
          </AppText>
          <TouchableOpacity
            style={{
              backgroundColor: Colors.GREEN_1,
              width: 70,
              height: 30,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 8,
            }}>
            <AppText style={{color: Colors.WHITE, fontWeight: 'bold'}}>
              Huỷ
            </AppText>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={container}>
      <Appbar.Header>
        <Appbar.BackAction color="white" onPress={() => navigation.goBack()} />
        <Appbar.Content color="white" title={trans('historyOrder')} />
      </Appbar.Header>
      <View style={{flex: 1}}>
        <FlatList
          data={dataOrder}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </View>
  );
};

export default HistoryOrder;
