import {set} from 'lodash';
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
import AppInput from '../../../components/molecules/AppInput';
import {AuthenOverallRedux} from '../../../redux';
import {get, post, put} from '../../../services/ServiceHandle';
import {Colors, Mixin} from '../../../styles';
import {container} from '../../../styles/GlobalStyles';
import {AddressVN, Const, trans} from '../../../utils';
import ChooseAddress from '../../Cart/Component/ChooseAddress';

const AddCustomerOffLine = ({navigation, route}) => {
  const {type} = route.params;
  const {itemEdit} = route.params;

  const [fullname, setFullName] = useState(itemEdit?.fullname);
  const [phone, setPhone] = useState(itemEdit?.phone);
  const [confirm, setConfirm] = useState(null);
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState('');
  const [customerId, setCustomerId] = useState('');

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

    return false;
  };

  const confirmOTP = () => {
    setLoading(true);
    const params = {
      otp: code,
    };
    post(
      `${Const.API.baseURL + Const.API.UserCustomer}/${customerId}/verify-otp`,
      params,
    ).then(res => {
      if (res.ok) {
        setLoading(false);
        setTimeout(() => {
          SimpleToast.show('Thêm mới khách hàng thành công', SimpleToast.SHORT);
          navigation.pop();
        }, 700);
      } else {
        setLoading(false);
        SimpleToast.show(res.error, SimpleToast.SHORT);
      }
    });
  };

  const sendOtp = id => {
    // const params = {
    //   phoneNumber: `+84${Number(phone)}`,
    // };
    post(`${Const.API.baseURL + Const.API.UserCustomer}/${id}/send-otp`).then(
      res => {
        if (res.ok) {
          setLoading(false);
          setConfirm('123456');
          setTimeout(() => {
            SimpleToast.show('Gửi mã OTP thành công!', SimpleToast.SHORT);
          }, 500);
        } else {
          setLoading(false);
          setTimeout(() => {
            SimpleToast.show(res.error, SimpleToast.SHORT);
          }, 500);
        }
      },
    );
  };

  const saveAddress = () => {
    if (handelCheckValue()) {
      return;
    }
    setLoading(true);

    const params = {
      phone: `+84${Number(phone)}`,
      fullname,
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
        } else {
          setLoading(false);
          setTimeout(() => {
            SimpleToast.show(res.error, SimpleToast.SHORT);
          }, 700);
        }
      });
    } else {
      post(Const.API.baseURL + Const.API.UserCustomer, params).then(res => {
        if (res.ok) {
          setCustomerId(res.data.data.id);
          sendOtp(res.data.data.id);
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
        {!confirm ? (
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

            <View style={{marginTop: 16}}>
              <Button
                containerStyle={{width: '100%'}}
                title={trans('save').toUpperCase()}
                onPress={saveAddress}
              />
            </View>
          </ScrollView>
        ) : (
          <View style={styles.viewContent}>
            <View style={styles.viewText}>
              <AppText>
                Vui lòng nhập mã OTP được gửi đến số điện thoại {phone}
              </AppText>
            </View>
            <View style={styles.viewInput}>
              <AppInput
                value={code}
                onChangeText={setCode}
                placeholder="Nhập mã OTP "
                keyboardType="numeric"
              />
              <Button
                containerStyle={{width: '100%', marginTop: 40}}
                title={trans('continue').toUpperCase()}
                onPress={confirmOTP}
              />
            </View>
          </View>
        )}
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
  viewContent: {
    flex: 1,
    paddingHorizontal: Mixin.moderateSize(32),
  },
  viewText: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewInput: {
    flex: 3,
  },
};

export default AddCustomerOffLine;
