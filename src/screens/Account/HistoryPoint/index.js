import React, {useEffect, useState} from 'react';
import {FlatList, RefreshControl, Text, View} from 'react-native';
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
  const [startDate, setStartDate] = useState(
    moment().subtract(1, 'months').format('DD/MM/YYYY'),
  );
  const [endDate, setEndDate] = useState(moment().format('DD/MM/YYYY'));
  const [dataPoint, setDataPoint] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const getData = () => {
      const params = {
        startDate: moment(startDate, 'DD/MM/YYYY').format(),
        endDate: moment(endDate, 'DD/MM/YYYY').format(),
      };
      get(Const.API.baseURL + Const.API.Point, params).then(res => {
        if (res.ok) {
          setDataPoint(res.data.data);
        }
      });
    };
    getData();
  }, [startDate, endDate]);

  const onRefresh = () => {
    setRefresh(true);
    const params = {
      startDate: moment(startDate, 'DD/MM/YYYY').format(),
      endDate: moment(endDate, 'DD/MM/YYYY').format(),
    };
    get(Const.API.baseURL + Const.API.Point, params).then(res => {
      if (res.ok) {
        setRefresh(false);
        setDataPoint(res.data.data);
      }
    });
  };

  const renderStatus = item => {
    if (item.status === 0) {
      return 'Chờ nhận';
    } else if (item.factor === 1) {
      return 'Đã nhận';
    } else {
      return 'Đã trừ';
    }
  };

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
          marginBottom: 12,
        }}>
        <Text>
          {item.factor === 1 ? (
            <Text style={{color: Colors.GREEN_1}}>
              + {numeral(item.amount).format()}{' '}
            </Text>
          ) : (
            <Text style={{color: Colors.RED}}>
              - {numeral(item.amount).format()}{' '}
            </Text>
          )}
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
            <Text
              style={{
                color: item.status === 0 ? Colors.RED : Colors.GREEN_1,
              }}>
              {' '}
              {renderStatus(item)}
            </Text>
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
            <SelectDate
              valueDate={startDate}
              setValueDate={date =>
                setStartDate(moment(date).format('DD/MM/YYYY'))
              }
            />
            <View style={styles.line} />
            <SelectDate
              valueDate={endDate}
              setValueDate={date =>
                setEndDate(moment(date).format('DD/MM/YYYY'))
              }
            />
          </View>
        </View>
        <FlatList
          data={dataPoint}
          renderItem={renderItem}
          ListEmptyComponent={renderEmptyComponent}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{padding: 16}}
          refreshControl={
            <RefreshControl refreshing={refresh} onRefresh={onRefresh} />
          }
        />
      </View>
    </View>
  );
};

export default HistoryPoint;
