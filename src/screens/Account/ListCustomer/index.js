import React from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import {Appbar} from 'react-native-paper';
import {AppText} from '../../../components/atoms';
import {Colors} from '../../../styles';
import {container} from '../../../styles/GlobalStyles';
import {trans} from '../../../utils';
import numeral from 'numeral';

const dataCustomer = [
  {
    name: 'Huỳnh Tuấn Huy',
    phone: '0987654321',
    rank: 'Cộng tác viên',
  },
  {
    name: 'Nguyễn Thành Phi',
    phone: '0123456789',
    rank: 'Đại lý',
  },
];
const ListCustomer = ({navigation}) => {
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
          marginTop: 16,
          padding: 20,
          borderRadius: 12,
        }}>
        <AppText>
          {item.name} - Cấp bậc : {item.rank}
        </AppText>
        <AppText style={{marginTop: 16}}>{item.phone}</AppText>
      </View>
    );
  };

  return (
    <View style={container}>
      <Appbar.Header>
        <Appbar.BackAction color="white" onPress={() => navigation.goBack()} />
        <Appbar.Content color="white" title={trans('listCustomer')} />
      </Appbar.Header>
      <View style={{flex: 1}}>
        <FlatList
          data={dataCustomer}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{paddingBottom: 16}}
        />
      </View>
    </View>
  );
};

export default ListCustomer;
