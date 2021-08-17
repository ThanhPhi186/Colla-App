import React, {useCallback, useEffect, useState} from 'react';
import {
  FlatList,
  Keyboard,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Appbar, Searchbar} from 'react-native-paper';
import SimpleToast from 'react-native-simple-toast';
import {useDispatch, useSelector} from 'react-redux';
import {images} from '../../../assets';
import {AppText} from '../../../components/atoms';
import {AuthenOverallRedux} from '../../../redux';
import {deleteApi, get, post, put} from '../../../services/ServiceHandle';
import {Colors} from '../../../styles';
import {container, rowSpaceBetween} from '../../../styles/GlobalStyles';
import {device_width} from '../../../styles/Mixin';
import {Const, trans} from '../../../utils';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useFocusEffect} from '@react-navigation/native';

const ListSalesCustomer = ({navigation, route}) => {
  const dispatch = useDispatch();

  const [dataCustomer, setDataCustomer] = useState([]);

  const {chooseCustomer} = route.params;

  useFocusEffect(
    useCallback(() => {
      getCustomer();
    }, []),
  );

  const getCustomer = () => {
    get(Const.API.baseURL + Const.API.UserCustomer).then(res => {
      if (res.ok) {
        setDataCustomer(res.data.data);
      } else {
        SimpleToast.show(res.error, SimpleToast.SHORT);
      }
    });
  };

  const selectCustomer = item => {
    chooseCustomer(item);
    navigation.goBack();
  };

  const onDelete = item => {
    deleteApi(`${Const.API.baseURL + Const.API.UserCustomer}/${item.id}`).then(
      res => {
        if (res.ok) {
          getCustomer();
          SimpleToast.show('Xoá địa chỉ thành công', SimpleToast.SHORT);
        }
      },
    );
  };

  const onChangeSearch = () => {};

  const renderItem = ({item}) => {
    return (
      <View style={styles.container}>
        <View style={{justifyContent: 'center'}}>
          <View style={{flexDirection: 'row', marginVertical: 5}}>
            <Icon name="account-circle" size={24} color={Colors.GRAY} />
            <View
              style={{width: '95%', justifyContent: 'center', marginLeft: 5}}>
              <AppText style={{fontSize: 16}}>{item.fullname}</AppText>
            </View>
          </View>
          {!item.is_default && (
            <TouchableOpacity
              style={{position: 'absolute', right: 0}}
              onPress={() => onDelete(item)}>
              <Icon name="trash-can-outline" size={24} color={Colors.GRAY} />
            </TouchableOpacity>
          )}
        </View>

        <View style={{flexDirection: 'row', marginVertical: 5}}>
          <Icon name="cellphone" size={24} color={Colors.GRAY} />
          <View style={{width: '95%', justifyContent: 'center', marginLeft: 5}}>
            <AppText style={{fontSize: 16}}>{item.phone}</AppText>
          </View>
        </View>

        <View style={{flexDirection: 'row', marginVertical: 5}}>
          <Icon name="map-marker" size={24} color={Colors.GRAY} />
          <View style={{width: '95%', justifyContent: 'center', marginLeft: 5}}>
            <AppText style={{fontSize: 16}}>{item.address_ship}</AppText>
          </View>
        </View>

        <View style={{flexDirection: 'row', width: '100%', marginTop: 5}}>
          <TouchableOpacity
            style={
              item.is_default ? styles.buttonChoose : styles.buttonUnchoose
            }
            onPress={() => selectCustomer(item)}>
            <AppText
              style={item.is_default ? styles.textChoose : styles.textUnchoose}>
              {trans('choose')}
            </AppText>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonEdit}
            onPress={() =>
              navigation.navigate('AddNewCustomer', {
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
        <Appbar.Content color="white" title={trans('listCustomer')} />
        <Appbar.Action
          color="white"
          icon="plus"
          size={28}
          onPress={() => navigation.navigate('AddNewCustomer', {type: 'NEW'})}
        />
      </Appbar.Header>
      <View style={{flex: 1}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginTop: 12,
          }}>
          <Searchbar
            placeholder={trans('search')}
            style={styles.containerSearch}
            inputStyle={styles.input}
            onChangeText={onChangeSearch}
          />
          <TouchableOpacity style={styles.btnAddNew}>
            <AppText>{trans('addNew')}</AppText>
          </TouchableOpacity>
        </View>

        <FlatList
          data={dataCustomer}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
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
    width: '30%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#999999',
  },
  containerSearch: {
    width: '60%',
    height: 48,
    borderRadius: 12,
  },
  input: {
    fontStyle: 'italic',
  },
  btnAddNew: {
    width: '30%',
    height: 48,
    borderColor: Colors.GRAY,
    borderWidth: 1,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
};

export default ListSalesCustomer;
