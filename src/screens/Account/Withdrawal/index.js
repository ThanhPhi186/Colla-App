import React from 'react';
import {FlatList, Keyboard, TouchableWithoutFeedback, View} from 'react-native';
import {Appbar, TextInput} from 'react-native-paper';
import {AppLoading} from '../../../components/atoms';
import {container} from '../../../styles/GlobalStyles';
import {Const, trans} from '../../../utils';
import {useEffect} from 'react';
import {get, post} from '../../../services/ServiceHandle';
import {useState} from 'react';

import {Button, DropDown, ItemOrder} from '../../../components/molecules';
import SimpleToast from 'react-native-simple-toast';
import {useSelector} from 'react-redux';
import {Colors} from '../../../styles';
import styles from './styles';

const Withdrawal = ({navigation}) => {
  const userInfo = useSelector(state => state.AuthenOverallReducer.userAuthen);
  const [listBank, setListBank] = useState([]);
  const [modalBank, setModalBank] = useState(false);
  const [bankCode, setBankCode] = useState(userInfo?.bankCode || '');
  const [bankBranch, setBankBranch] = useState(userInfo?.bankBranch || '');
  const [bankNumber, setBankNumber] = useState(userInfo?.bankNumber);
  const [accountHolder, setAccountHolder] = useState(userInfo?.bankAccountName || '');
  const [amount, setAmount] = useState('');
  console.log(userInfo);
  useEffect(() => {
    const getListBank = () => {
      get(Const.API.baseURL + Const.API.Bank).then(res => {
        if (res.ok) {
          const convertData = res.data.data.map(elm => {
            return {
              label: `${elm.vn_name} (${elm.shortName})`,
              value: elm.bankCode,
            };
          });
          setListBank(convertData);
        } else {
          SimpleToast.show(res.error, SimpleToast.SHORT);
        }
      });
    };
    getListBank();
  }, []);

  const handelCheckValue = () => {
    if (!bankCode) {
      SimpleToast.show('Vui lòng chọn ngân hàng', SimpleToast.SHORT);
      return true;
    }
    if (!bankBranch) {
      SimpleToast.show('Chi nhánh không được để trống', SimpleToast.SHORT);
      return true;
    }
    if (!bankNumber) {
      SimpleToast.show('Số tài khoản không được để trống', SimpleToast.SHORT);
      return true;
    }
    if (!accountHolder) {
      SimpleToast.show('Chủ tài khoản không được để trống', SimpleToast.SHORT);
      return true;
    }
    if (!amount) {
      SimpleToast.show('Vui lòng chọn nhập số tiền cần nạp', SimpleToast.SHORT);
      return true;
    }
    return false;
  };

  const goWithdrawal = () => {
    if (handelCheckValue()) {
      return;
    }
    const params = {
      bankNumber,
      bankBranch,
      bankCode,
      name: accountHolder,
      amount: amount,
    };
    post(Const.API.baseURL + Const.API.Withdrawal, params).then(res => {
      if (res.ok) {
        SimpleToast.show(
          'Thao tác thành công, hãy đợi admin xác nhận',
          SimpleToast.SHORT,
        );
        navigation.goBack();
      } else {
        SimpleToast.show(res.error, SimpleToast.SHORT);
      }
    });
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={container}>
        <Appbar.Header>
          <Appbar.BackAction
            color="white"
            onPress={() => navigation.goBack()}
          />
          <Appbar.Content color="white" title={trans('withdrawal')} />
        </Appbar.Header>
        <View style={{flex: 1, paddingHorizontal: 16, paddingTop: 16}}>
          <DropDown
            title="Ngân hàng"
            placeholder={trans('chooseBank')}
            open={modalBank}
            setOpen={setModalBank}
            items={listBank}
            setItems={setListBank}
            value={bankCode}
            setValue={setBankCode}
            searchable
            searchPlaceholder={trans('search')}
            listMode="SCROLLVIEW"
          />

          <TextInput
            placeholder="Nhập chi nhánh"
            style={{backgroundColor: Colors.WHITE, marginTop: 16}}
            label={trans('branch')}
            value={bankBranch}
            onChangeText={setBankBranch}
            mode="outlined"
          />
          <TextInput
            placeholder="Số tài khoản"
            style={{backgroundColor: Colors.WHITE, marginTop: 16}}
            label={trans('bankAccountNumber')}
            value={bankNumber}
            onChangeText={setBankNumber}
            mode="outlined"
          />
          <TextInput
            placeholder={trans('accountHolder')}
            style={{backgroundColor: Colors.WHITE, marginTop: 16}}
            label={trans('accountHolder')}
            value={accountHolder}
            onChangeText={setAccountHolder}
            mode="outlined"
          />
          <TextInput
            placeholder={trans('amountOfMoney')}
            style={{backgroundColor: Colors.WHITE, marginTop: 16}}
            label={trans('amountOfMoney')}
            value={amount}
            onChangeText={setAmount}
            mode="outlined"
          />
          <Button
            containerStyle={styles.btnWithdrawal}
            title={trans('withdrawal')}
            onPress={goWithdrawal}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Withdrawal;
