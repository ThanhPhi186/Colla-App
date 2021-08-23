import React, {useRef, useState} from 'react';
import {
  Keyboard,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
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
import ChooseAddress from '../Component/ChooseAddress';

const AddNewAddress = ({navigation, route}) => {
  const dispatch = useDispatch();

  const {type} = route.params;
  const {itemEdit} = route.params;

  const refAddress = useRef();

  const [fullname, setFullName] = useState(itemEdit?.fullname);
  const [phone, setPhone] = useState(itemEdit?.phone);
  const [address, setAddress] = useState(itemEdit?.address);
  const [valueSwitch, setValueSwitch] = useState(false);

  console.log('refAddress.current', refAddress.current);

  const handelCheckValue = () => {
    const regex =
      /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/;
    if (!fullname) {
      SimpleToast.show('Tên người nhận không được để trống', SimpleToast.SHORT);
      return true;
    }
    if (!regex.test(phone)) {
      SimpleToast.show('Số điện thoại không đúng định dạng', SimpleToast.SHORT);
      return true;
    }
    if (!address) {
      SimpleToast.show('Địa chỉ không được để trống', SimpleToast.SHORT);
      return true;
    }
    if (!refAddress.current.province) {
      SimpleToast.show('Vui lòng chọn Tỉnh / Thành Phố', SimpleToast.SHORT);
      return true;
    }
    if (!refAddress.current.districts) {
      SimpleToast.show('Vui lòng chọn Quận / Huyện', SimpleToast.SHORT);
      return true;
    }
    if (!refAddress.current.wards) {
      SimpleToast.show('Vui lòng chọn Xã / Phường', SimpleToast.SHORT);
      return true;
    }

    return false;
  };

  const saveAddress = () => {
    if (handelCheckValue()) {
      return;
    }
    const addressConvert =
      address +
      ', ' +
      refAddress.current.wards.name +
      ', ' +
      refAddress.current.districts.name +
      ', ' +
      refAddress.current.province.name;

    const params = {
      phone: `+84${Number(phone)}`,
      fullname,
      address: addressConvert,
      is_default: valueSwitch,
      district: refAddress.current.districts.id,
      province: refAddress.current.province.id,
      ward: refAddress.current.wards.id,
    };
    if (type === 'EDIT') {
      put(
        `${Const.API.baseURL + Const.API.Useraddress}/${itemEdit.id}`,
        params,
      ).then(res => {
        if (res.ok) {
          dispatch(AuthenOverallRedux.Actions.getProfile.request());
          SimpleToast.show('Chỉnh sửa địa chỉ thành công', SimpleToast.SHORT);
          navigation.goBack();
        }
      });
    } else {
      post(Const.API.baseURL + Const.API.Useraddress, params).then(res => {
        if (res.ok) {
          dispatch(AuthenOverallRedux.Actions.getProfile.request());
          SimpleToast.show('Thêm mới địa chỉ thành công', SimpleToast.SHORT);
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
        <ScrollView style={{paddingHorizontal: 16}}>
          <TextInput
            style={{
              backgroundColor: Colors.WHITE,
              marginVertical: 16,
            }}
            label={trans('recipientName')}
            value={fullname}
            onChangeText={setFullName}
            mode="outlined"
          />
          <TextInput
            style={{backgroundColor: Colors.WHITE, marginVertical: 16}}
            label={trans('phoneNumber')}
            value={phone}
            onChangeText={setPhone}
            mode="outlined"
          />
          <TextInput
            style={{backgroundColor: Colors.WHITE, marginVertical: 16}}
            label={trans('deliveryAddress')}
            value={address}
            onChangeText={setAddress}
            mode="outlined"
          />

          <ChooseAddress ref={refAddress} />
          <View style={{marginTop: 16}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '100%',
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
            <Button
              containerStyle={{width: '100%'}}
              title={trans('save').toUpperCase()}
              onPress={saveAddress}
            />
          </View>
        </ScrollView>
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
