import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {Colors} from '../../styles';
import {AppText} from '../atoms';
import moment from 'moment';
import numeral from 'numeral';

const ItemOrder = props => {
  const {item, confirmOrder, cancelOrder} = props;

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
      </View>
      {confirmOrder && (
        <View style={styles.viewGroupBtn}>
          <TouchableOpacity style={styles.btnCancel} onPress={cancelOrder}>
            <AppText style={{color: Colors.GREEN_1, fontWeight: 'bold'}}>
              Huỷ
            </AppText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnConfirm} onPress={confirmOrder}>
            <AppText style={{color: Colors.WHITE, fontWeight: 'bold'}}>
              Xác nhận
            </AppText>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = {
  containerItem: {
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
    borderRadius: 12,
  },
  btnCancel: {
    backgroundColor: Colors.WHITE,
    width: '46%',
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.GREEN_1,
  },
  btnConfirm: {
    backgroundColor: Colors.GREEN_1,
    width: '46%',
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  viewGroupBtn: {
    flexDirection: 'row',
    marginTop: 8,
    width: '60%',
    justifyContent: 'space-between',
  },
};

export default ItemOrder;
