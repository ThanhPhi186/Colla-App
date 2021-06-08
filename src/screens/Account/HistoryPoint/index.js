import React, {useEffect, useState} from 'react';
import {FlatList, View} from 'react-native';
import {Appbar} from 'react-native-paper';
import {AppText} from '../../../components/atoms';
import {Colors} from '../../../styles';
import {container} from '../../../styles/GlobalStyles';
import {Const, trans} from '../../../utils';
import numeral from 'numeral';
import {FONT_SIZE_14} from '../../../styles/Typography';
import {get} from '../../../services/ServiceHandle';
import moment from 'moment';
import styles from './styles';

const HistoryPoint = ({navigation}) => {
  const [dataPoint, setDataPoint] = useState([]);

  useEffect(() => {
    get(Const.API.baseURL + Const.API.Point).then(res => {
      if (res.ok) {
        setDataPoint(res.data.data);
      }
    });
  }, []);

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
            {item.reason}
          </AppText>
          <AppText>{moment(item.createdAt).format('DD.MM.YYYY')}</AppText>
        </View>
        <AppText
          style={{
            color: Colors.GREEN_1,
            fontWeight: '600',
            fontSize: FONT_SIZE_14,
          }}>
          + {numeral(item.amount).format()}
        </AppText>
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
      <FlatList
        data={dataPoint}
        renderItem={renderItem}
        ListEmptyComponent={renderEmptyComponent}
        keyExtractor={(item, index) => index.toString()}
        style={{padding: 16}}
      />
    </View>
  );
};

export default HistoryPoint;
