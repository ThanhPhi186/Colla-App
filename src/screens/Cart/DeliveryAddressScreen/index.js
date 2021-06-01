import React, {useState} from 'react';
import {
  FlatList,
  Keyboard,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Appbar, Switch, TextInput} from 'react-native-paper';
import SimpleToast from 'react-native-simple-toast';
import {useDispatch, useSelector} from 'react-redux';
import {images} from '../../../assets';
import {AppText} from '../../../components/atoms';
import {AuthenOverallRedux} from '../../../redux';
import {get, put} from '../../../services/ServiceHandle';
import {Colors} from '../../../styles';
import {container} from '../../../styles/GlobalStyles';
import {device_width} from '../../../styles/Mixin';
import {Const, trans} from '../../../utils';

const DeliveryAddressScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const dataAddress = useSelector(
    state => state.AuthenOverallReducer.userAuthen.addresses,
  );

  const pressDefault = item => {
    const params = {
      phone: item.phone,
      fullname: item.fullname,
      address: item.address,
      is_default: true,
    };
    put(`${Const.API.baseURL + Const.API.Useraddress}/${item.id}`, params).then(
      res => {
        if (res.ok) {
          dispatch(AuthenOverallRedux.Actions.getProfile.request());
          SimpleToast.show('Cập nhật địa chỉ thành công', SimpleToast.SHORT);
        }
      },
    );
  };

  const renderItem = ({item}) => {
    return (
      <View style={styles.container}>
        <View style={{flexDirection: 'row', marginVertical: 5}}>
          <FastImage source={images.avatar} style={{width: 24, height: 24}} />
          <View style={{width: '95%', justifyContent: 'center', marginLeft: 5}}>
            <AppText style={{fontSize: 16}}>{item.fullname}</AppText>
          </View>
        </View>

        <View style={{flexDirection: 'row', marginVertical: 5}}>
          <FastImage source={images.avatar} style={{width: 24, height: 24}} />
          <View style={{width: '95%', justifyContent: 'center', marginLeft: 5}}>
            <AppText style={{fontSize: 16}}>{item.phone}</AppText>
          </View>
        </View>

        <View style={{flexDirection: 'row', marginVertical: 5}}>
          <FastImage source={images.avatar} style={{width: 24, height: 24}} />
          <View style={{width: '95%', justifyContent: 'center', marginLeft: 5}}>
            <AppText style={{fontSize: 16}}>{item.address}</AppText>
          </View>
        </View>

        <View style={{flexDirection: 'row', width: '100%', marginTop: 5}}>
          <TouchableOpacity
            style={
              item.is_default ? styles.buttonChoose : styles.buttonUnchoose
            }
            onPress={() => pressDefault(item)}>
            <AppText
              style={item.is_default ? styles.textChoose : styles.textUnchoose}>
              {trans('setDefault')}
            </AppText>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.buttonEdit}
            onPress={() =>
              navigation.navigate('AddNewAddress', {
                itemEdit: item,
                type: 'EDIT',
              })
            }>
            <AppText style={styles.textUnchoose}>{trans('edited')}</AppText>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={container}>
      <Appbar.Header>
        <Appbar.BackAction color="white" onPress={() => navigation.goBack()} />
        <Appbar.Content color="white" title={trans('deliveryAddress')} />
        <Appbar.Action
          color="white"
          icon="plus"
          size={28}
          onPress={() => navigation.navigate('AddNewAddress', {type: 'NEW'})}
        />
      </Appbar.Header>

      <FlatList
        data={dataAddress}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = {
  container: {
    width: device_width,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.WHITE_SMOKE,
    backgroundColor: 'white',
  },
  buttonChoose: {
    width: '45%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.PRIMARY,
    borderRadius: 20,
  },
  textChoose: {
    fontSize: 16,
    fontWeight: '500',
    color: 'white',
  },
  buttonEdit: {
    width: '30%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
    marginLeft: 10,
    borderWidth: 1,
    borderColor: '#999999',
  },
  textUnchoose: {
    fontSize: 16,
    fontWeight: '500',
  },
  buttonUnchoose: {
    width: '45%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#999999',
  },
};

export default DeliveryAddressScreen;
