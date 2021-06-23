import React from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import {Appbar} from 'react-native-paper';
import {AppLoading, AppText} from '../../../components/atoms';
import {Colors} from '../../../styles';
import {container} from '../../../styles/GlobalStyles';
import {Const, trans} from '../../../utils';
import numeral from 'numeral';
import {useEffect} from 'react';
import {get, put} from '../../../services/ServiceHandle';
import {useState} from 'react';
import moment from 'moment';
import styles from './styles';
import SimpleToast from 'react-native-simple-toast';

const HistoryOrder = ({navigation, route}) => {
  const [dataOrder, setDataOrder] = useState([]);
  const [loading, setLoading] = useState(false);

  const {type} = route.params;

  useEffect(() => {
    getData();
  }, [type]);

  const getData = () => {
    setLoading(true);
    get(
      Const.API.baseURL +
        (type === 'SALES' ? Const.API.Order : Const.API.ImportOrder),
    ).then(res => {
      if (res.ok) {
        setLoading(false);
        setDataOrder(res.data.data);
      } else {
        setLoading(false);
        console.log(res.error);
      }
    });
  };

  const changeStatus = (item, status) => {
    put(`${Const.API.baseURL + Const.API.Order}/${item.id}`, {status}).then(
      res => {
        if (res.ok) {
          getData();
        } else {
          SimpleToast.show(res.error, SimpleToast.SHORT);
        }
      },
    );
  };

  const renderStatus = status => {
    switch (status) {
      case 'verifing':
        return 'Đang chờ xác nhận';
      case 'verified':
        return 'Đã xác nhận';
      case 'shipping':
        return 'Đang giao hàng';
      case 'shipped':
        return 'Đã giao hàng';
      case 'finish':
        return 'Hoàn thành';
      case 'cancel':
        return 'Đã huỷ';
    }
  };

  const renderColorStatus = status => {
    switch (status) {
      case 'verifing':
        return Colors.ORANGE_CODE.orange600;
      case 'verified':
        return Colors.BLUE_CODE.blue600;
      case 'shipping':
        return Colors.LIME_CODE.lime800;
      case 'shipped':
        return Colors.CYAN_CODE.cyan600;
      case 'finish':
        return Colors.GREEN_1;
      case 'cancel':
        return Colors.RED_CODE.red500;
    }
  };

  const renderItem = ({item}) => {
    return (
      <View style={styles.containerItem}>
        <View style={{alignItems: 'flex-end'}}>
          <AppText
            style={{color: Colors.WHITE, fontWeight: 'bold'}}
            containerStyle={{
              backgroundColor: renderColorStatus(item.status),
              padding: 8,
              borderRadius: 8,
            }}>
            {renderStatus(item.status)}
          </AppText>
        </View>
        <AppText>
          Người nhận: <Text style={{fontWeight: 'bold'}}>{item.fullname}</Text>
        </AppText>
        <AppText>
          Địa chỉ: <Text style={{fontWeight: 'bold'}}>{item.address_ship}</Text>
        </AppText>
        <AppText>
          Thời gian tạo:{' '}
          <Text style={{fontWeight: 'bold'}}>
            {moment(item.createdAt).format('HH:mm:ss - DD-MM-YYYY')}
          </Text>
        </AppText>
        <View style={{flexDirection: 'row'}}>
          <AppText>Sản phẩm: </AppText>
          <View>
            <AppText />
            {item.order_details.map((elm, index) => {
              return (
                <AppText style={{fontWeight: 'bold'}} key={index}>
                  - {elm.product.name} x {elm.amount}
                </AppText>
              );
            })}
          </View>
        </View>
        <View style={{alignItems: 'flex-end', marginTop: 12}}>
          <AppText style={{color: Colors.GREEN_1}}>
            Tổng: {numeral(item.total).format()} đ
          </AppText>
          {type === 'SALES' &&
            item.status !== 'finish' &&
            item.status !== 'cancel' && (
              <View style={styles.viewGroupBtn}>
                <TouchableOpacity
                  style={styles.btnCancel}
                  onPress={() => changeStatus(item, 'cancel')}>
                  <AppText style={{color: Colors.GREEN_1, fontWeight: 'bold'}}>
                    Huỷ
                  </AppText>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.btnConfirm}
                  onPress={() => changeStatus(item, 'finish')}>
                  <AppText style={{color: Colors.WHITE, fontWeight: 'bold'}}>
                    Xác nhận
                  </AppText>
                </TouchableOpacity>
              </View>
            )}
        </View>
      </View>
    );
  };

  return (
    <View style={container}>
      <Appbar.Header>
        <Appbar.BackAction color="white" onPress={() => navigation.goBack()} />
        <Appbar.Content
          color="white"
          title={
            type === 'SALES' ? trans('salesHistory') : trans('historyOrder')
          }
        />
      </Appbar.Header>
      <AppLoading isVisible={loading} />
      <View style={{flex: 1}}>
        <FlatList
          data={dataOrder}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{paddingBottom: 16}}
        />
      </View>
    </View>
  );
};

export default HistoryOrder;
