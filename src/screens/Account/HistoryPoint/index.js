import React from 'react';
import {FlatList, View} from 'react-native';
import {Appbar} from 'react-native-paper';
import {AppText} from '../../../components/atoms';
import {Colors} from '../../../styles';
import {container} from '../../../styles/GlobalStyles';
import {trans} from '../../../utils';
import numeral from 'numeral';
import {FONT_SIZE_14} from '../../../styles/Typography';

const HistoryPoint = ({navigation}) => {
  const dataPoint = [
    {
      name: 'Bán hàng đơn DH0001',
      point: 5000,
      date: '30/05/2021',
    },
    {
      name: 'Bán hàng đơn DH0002',
      point: 7000,
      date: '29/05/2021',
    },
    {
      name: 'Bán hàng đơn DH0003',
      point: 9000,
      date: '28/05/2021',
    },
    {
      name: 'Bán hàng đơn DH0004',
      point: 10000,
      date: '27/05/2021',
    },
  ];

  const renderItem = ({item}) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          height: 80,
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottomWidth: 1,
          borderColor: Colors.LIGHT_GREY,
        }}>
        <View>
          <AppText
            style={{
              fontWeight: '600',
              marginBottom: 8,
              fontSize: FONT_SIZE_14,
            }}>
            {item.name}
          </AppText>
          <AppText>{item.date}</AppText>
        </View>
        <AppText
          style={{
            color: Colors.GREEN_1,
            fontWeight: '600',
            fontSize: FONT_SIZE_14,
          }}>
          + {numeral(item.point).format()}
        </AppText>
      </View>
    );
  };

  return (
    <View style={container}>
      <Appbar.Header>
        <Appbar.BackAction color="white" onPress={() => navigation.goBack()} />
        <Appbar.Content color="white" title={trans('historyPoint')} />
      </Appbar.Header>
      <FlatList
        data={dataPoint}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        style={{padding: 16}}
      />
    </View>
  );
};

export default HistoryPoint;
