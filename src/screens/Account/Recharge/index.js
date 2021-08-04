import React, {useCallback} from 'react';
import {
  FlatList,
  Keyboard,
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {Appbar, TextInput} from 'react-native-paper';
import {AppLoading, AppText} from '../../../components/atoms';
import {container} from '../../../styles/GlobalStyles';
import {Const, trans} from '../../../utils';
import {useEffect} from 'react';
import {get, post} from '../../../services/ServiceHandle';
import {useState} from 'react';

import {Button, DropDown, ItemOrder} from '../../../components/molecules';
import SimpleToast from 'react-native-simple-toast';
import {useSelector} from 'react-redux';
import {Colors, Mixin} from '../../../styles';
import styles from './styles';
import Modal from 'react-native-modal';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import FastImage from 'react-native-fast-image';
import {images} from '../../../assets';

const Recharge = ({navigation}) => {
  const [listBank, setListBank] = useState([]);

  const [amount, setAmount] = useState('');
  const [modalImage, setModalImage] = useState(false);
  const [image, setImage] = useState(null);

  const actions = [
    {
      title: 'Camera',
      type: 'capture',
      options: {
        saveToPhotos: true,
        mediaType: 'photo',
        includeBase64: true,
      },
    },
    {
      title: 'Chọn từ thư viện',
      type: 'library',
      options: {
        maxHeight: 200,
        maxWidth: 200,
        selectionLimit: 1,
        mediaType: 'photo',
        includeBase64: true,
      },
    },
  ];

  useEffect(() => {
    const getListBank = () => {
      get(Const.API.baseURL + Const.API.RechargeBank).then(res => {
        if (res.ok) {
          setListBank(res.data.data);
        } else {
          SimpleToast.show(res.error, SimpleToast.SHORT);
        }
      });
    };
    getListBank();
  }, []);

  const handelCheckValue = () => {
    if (!amount) {
      SimpleToast.show('Vui lòng chọn nhập số tiền cần nạp', SimpleToast.SHORT);
      return true;
    }
    if (!image) {
      SimpleToast.show(
        'Chụp ảnh màn hình hoặc chọn ảnh hoá đơn nạp tiền',
        SimpleToast.SHORT,
      );
      return true;
    }
    return false;
  };

  const goWithdrawal = () => {
    if (handelCheckValue()) {
      return;
    }
    const params = {
      amount: amount,
      proofOfTransfer: image.assets[0].base64,
    };
    console.log('paramsss', params);
    post(Const.API.baseURL + Const.API.Recharge, params).then(res => {
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

  const handleImage = useCallback((type, options) => {
    if (type === 'capture') {
      launchCamera(options, setImage);
    } else {
      launchImageLibrary(options, setImage);
    }
  }, []);

  console.log('image', image);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={container}>
        <Appbar.Header>
          <Appbar.BackAction
            color="white"
            onPress={() => navigation.goBack()}
          />
          <Appbar.Content color="white" title={trans('recharge')} />
        </Appbar.Header>
        <ScrollView style={{flex: 1, paddingHorizontal: 16, paddingTop: 16}}>
          {listBank.map((elm, idx) => {
            return (
              <View
                key={idx}
                style={{
                  padding: 16,
                  backgroundColor: Colors.WHITE,
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                  elevation: 5,
                  marginTop: 8,
                }}>
                <FastImage
                  style={{width: '60%', height: 60, alignSelf: 'center'}}
                  resizeMode="contain"
                  source={{uri: `data:image/png;base64,${elm.bank_logo}`}}
                />
                <Text style={{marginTop: 4}}>
                  <Text style={{fontWeight: 'bold'}}>Chủ tài khoản: </Text>
                  {elm.bank_account_name}
                </Text>
                <Text style={{marginTop: 4}}>
                  <Text style={{fontWeight: 'bold'}}>Tên ngân hàng: </Text>
                  {elm.bank_name}
                </Text>
                <Text style={{marginTop: 4}}>
                  <Text style={{fontWeight: 'bold'}}>STK: </Text>
                  {elm.bank_account_number}
                </Text>
              </View>
            );
          })}
          <TextInput
            placeholder={trans('amountOfMoney')}
            style={{backgroundColor: Colors.WHITE, marginTop: 16}}
            label={trans('amountOfMoney')}
            value={amount}
            onChangeText={setAmount}
            mode="outlined"
          />
          <TouchableOpacity
            onPress={() => setModalImage(true)}
            style={{
              height: 200,
              marginTop: 16,
              borderWidth: 1,
              borderColor: Colors.GRAY,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {image ? (
              <FastImage
                style={{height: 200, width: '100%'}}
                source={{uri: image.assets[0].uri}}
                resizeMode="contain"
              />
            ) : (
              <AppText title style={{fontStyle: 'italic', color: Colors.GRAY}}>
                Ảnh chụp màn hình / hoá đơn
              </AppText>
            )}
          </TouchableOpacity>
          <Button
            containerStyle={styles.btnWithdrawal}
            title={trans('recharge')}
            onPress={goWithdrawal}
          />
        </ScrollView>
        <Modal
          isVisible={modalImage}
          onBackdropPress={() => setModalImage(false)}>
          <View
            style={{
              width: Mixin.device_width * 0.9,
              backgroundColor: Colors.WHITE,
              borderRadius: Mixin.moderateSize(8),
              justifyContent: 'center',
              alignItems: 'center',
              paddingVertical: Mixin.moderateSize(16),
            }}>
            {actions.map(({title, type, options}) => {
              return (
                <Button
                  key={title}
                  title={title}
                  onPress={() => handleImage(type, options)}
                />
              );
            })}
          </View>
        </Modal>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Recharge;
