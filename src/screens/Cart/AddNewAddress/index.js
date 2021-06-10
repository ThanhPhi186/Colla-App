import React, {useState} from 'react';
import {Keyboard, TouchableWithoutFeedback, View} from 'react-native';
import {Appbar, Switch, TextInput} from 'react-native-paper';
import SimpleToast from 'react-native-simple-toast';
import {useDispatch} from 'react-redux';
import {AppText} from '../../../components/atoms';
import {Button} from '../../../components/molecules';
import {AuthenOverallRedux} from '../../../redux';
import {get, post, put} from '../../../services/ServiceHandle';
import {Colors} from '../../../styles';
import {container} from '../../../styles/GlobalStyles';
import {AddressVN, Const, trans} from '../../../utils';

const AddNewAddress = ({navigation, route}) => {
  const dispatch = useDispatch();

  // const {type} = route.params;
  // const {itemEdit} = route.params;
  const type = 'ADD';
  const itemEdit = null;

  const [fullname, setFullName] = useState(itemEdit?.fullname);
  const [phone, setPhone] = useState(itemEdit?.phone);
  const [address, setAddress] = useState(itemEdit?.address);
  const [valueSwitch, setValueSwitch] = useState(false);
  console.log('fullname', fullname);

  const handelCheckValue = () => {
    if (!fullname) {
      SimpleToast.show('Tên người nhận không được để trống', SimpleToast.SHORT);
      return true;
    }
    if (!phone) {
      SimpleToast.show('Số điện thoại không được để trống', SimpleToast.SHORT);
      return true;
    }
    if (!address) {
      SimpleToast.show('Địa chỉ không được để trống', SimpleToast.SHORT);
      return true;
    }

    return false;
  };

  const saveAddress = () => {
    if (handelCheckValue()) {
      return;
    }
    const params = {
      phone,
      fullname,
      address,
      is_default: valueSwitch,
    };
    if (type === 'EDIT') {
      put(
        `${Const.API.baseURL + Const.API.Useraddress}/${itemEdit.id}`,
        params,
      ).then(res => {
        if (res.ok) {
        }
      });
    } else {
      post(Const.API.baseURL + Const.API.Useraddress, params).then(res => {
        if (res.ok) {
          dispatch(AuthenOverallRedux.Actions.getProfile.request());
          SimpleToast.show('thêm mới địa chỉ thành công', SimpleToast.SHORT);
          navigation.goBack();
        }
      });
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={container}>
        <Appbar.Header>
          <Appbar.BackAction
            color="white"
            onPress={() => navigation.goBack()}
          />
          <Appbar.Content
            color="white"
            title={
              type === 'EDIT' ? trans('editAddress') : trans('addNewAddress')
            }
          />
        </Appbar.Header>

        <TextInput
          style={{
            backgroundColor: Colors.WHITE,
            marginVertical: 16,
          }}
          label={trans('recipientName')}
          value={fullname}
          onChangeText={setFullName}
        />
        <TextInput
          style={{backgroundColor: Colors.WHITE, marginVertical: 16}}
          label={trans('phoneNumber')}
          value={phone}
          onChangeText={setPhone}
        />
        <TextInput
          style={{backgroundColor: Colors.WHITE, marginVertical: 16}}
          label={trans('deliveryAddress')}
          value={address}
          onChangeText={setAddress}
        />

        <View style={{flex: 1, alignItems: 'center', marginTop: 16}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '90%',
              alignItems: 'center',
              marginBottom: 16,
            }}>
            <AppText>Đặt làm địa chỉ mặc định</AppText>
            <Switch
              onValueChange={() => setValueSwitch(!valueSwitch)}
              value={valueSwitch}
              trackColor="#0187E0"
              thumbColor={Colors.WHITE}
              ios_backgroundColor={Colors.WHITE_SMOKE}
            />
          </View>

          <Button title={trans('save').toUpperCase()} onPress={saveAddress} />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = {
  containerEnterPhone: {
    width: '85%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  imageCountryFlag: {
    width: 40,
    height: 25,
    marginRight: 5,
  },
  phoneNumber: {
    width: '75%',
    height: 50,
    borderBottomWidth: 0.7,
    borderBottomColor: Colors.LIGHT_GREY,
    fontSize: 16,
    fontWeight: '400',
    padding: 0,
    textAlignVertical: 'center',
  },
};

export default AddNewAddress;
