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
import {AppLoading, AppText} from '../../../components/atoms';
import {Button} from '../../../components/molecules';
import {AuthenOverallRedux} from '../../../redux';
import {get, post, put} from '../../../services/ServiceHandle';
import {Colors} from '../../../styles';
import {container} from '../../../styles/GlobalStyles';
import {AddressVN, Const, trans} from '../../../utils';
import ChooseAddress from '../../Cart/Component/ChooseAddress';

const AddNewCustomer = ({navigation, route}) => {
  const {type} = route.params;
  const {itemEdit} = route.params;

  const refAddress = useRef();

  const [fullname, setFullName] = useState(itemEdit?.fullname);
  const [phone, setPhone] = useState(itemEdit?.phone);
  const [address, setAddress] = useState(itemEdit?.address);
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
    const addressConvert =
      address +
      ', ' +
      refAddress.current.wards.name +
      ', ' +
      refAddress.current.districts.name +
      ', ' +
      refAddress.current.province.name;

    const params = {
      phone: phone,
      fullname,
      address_ship: addressConvert,
      district: refAddress.current.districts.id,
      province: refAddress.current.province.id,
      ward: refAddress.current.wards.id,
    };
    if (type === 'EDIT') {
      put(
        `${Const.API.baseURL + Const.API.UserCustomer}/${itemEdit.id}`,
        params,
      ).then(res => {
        if (res.ok) {
          setLoading(false);
          setTimeout(() => {
            SimpleToast.show(
              'Chỉnh sửa khách hàng thành công',
              SimpleToast.SHORT,
            );
            navigation.pop();
          }, 700);
        }
      });
    } else {
      post(Const.API.baseURL + Const.API.UserCustomer, params).then(res => {
        if (res.ok) {
          setLoading(false);
          setTimeout(() => {
            SimpleToast.show(
              'Thêm mới khách hàng thành công',
              SimpleToast.SHORT,
            );
            navigation.pop();
          }, 700);
        } else {
          setLoading(false);
          setTimeout(() => {
            SimpleToast.show(res.error, SimpleToast.SHORT);
          }, 700);
        }
      });
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={container}>
        <AppLoading isVisible={loading} />
        <Appbar.Header>
          <Appbar.BackAction
            color="white"
            onPress={() => navigation.goBack()}
          />
          <Appbar.Content
            color="white"
            title={
              type === 'EDIT' ? trans('editCustomer') : trans('addNewCustomer')
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

export default AddNewCustomer;
