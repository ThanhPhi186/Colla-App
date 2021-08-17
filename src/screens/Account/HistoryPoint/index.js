import React, {useEffect, useState} from 'react';
import {FlatList, Text, View} from 'react-native';
import {Appbar} from 'react-native-paper';
import {AppText, FormInput} from '../../../components/atoms';
import {Colors} from '../../../styles';
import {container} from '../../../styles/GlobalStyles';
import {Const, trans} from '../../../utils';
import numeral from 'numeral';
import {FONT_SIZE_14} from '../../../styles/Typography';
import {get} from '../../../services/ServiceHandle';
import moment from 'moment';
import styles from './styles';
import SelectDate from './component/SelectDate';

const HistoryPoint = ({navigation}) => {
  const [startDate, setStartDate] = useState(moment().format('DD/MM/YYYY'));
  const [endDate, setEndDate] = useState(moment().format('DD/MM/YYYY'));
  const [dataPoint, setDataPoint] = useState([
    {
      reason: 'Bán hàng online - Khách hàng 0376871280',
      createdAt: '01/07/2021',
      amount: '50000',
      status: 'Chờ nhận',
    },
  ]);

  // useEffect(() => {
  //   get(Const.API.baseURL + Const.API.Point).then(res => {
  //     if (res.ok) {
  //       setDataPoint(res.data.data);
  //     }
  //   });
  // }, []);

  const renderItem = ({item}) => {
    return (
      <View
        style={{
          backgroundColor: Colors.WHITE,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
          borderRadius: 8,
          padding: 8,
        }}>
        <Text>
          <Text style={{color: Colors.GREEN_1}}>
            + {numeral(item.amount).format()}{' '}
          </Text>
          {item.reason}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 8,
          }}>
          <AppText>{moment(item.createdAt).format('DD/MM/YYYY')}</AppText>
          <Text>
            Trạng thái:
            <Text> {item.status}</Text>
          </Text>
        </View>
      </View>
    );
  };

  const renderEmptyComponent = () => {
    return (
      <AppText style={styles.txtEmpty}>{trans('emptyHistoryPoint')}</AppText>
    );
  };

  return (
    <View style={container}>
      <Appbar.Header>
        <Appbar.BackAction color="white" onPress={() => navigation.goBack()} />
        <Appbar.Content color="white" title={trans('historyPoint')} />
      </Appbar.Header>
      <View style={{flex: 1}}>
        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: 16,
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 12,
          }}>
          <Text>Thời gian:</Text>
          <View style={{flexDirection: 'row'}}>
            <SelectDate valueDate={startDate} />
            <View style={styles.line} />
            <SelectDate valueDate={endDate} />
          </View>
        </View>
        <FlatList
          data={dataPoint}
          renderItem={renderItem}
          ListEmptyComponent={renderEmptyComponent}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{padding: 16}}
        />
      </View>
    </View>
  );
};

export default HistoryPoint;
