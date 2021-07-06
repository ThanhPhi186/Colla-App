import React, {useCallback, useEffect, useState} from 'react';
import {Pressable, Text, TouchableOpacity, View} from 'react-native';
import {Appbar} from 'react-native-paper';
import {AppText, FormInput} from '../../../components/atoms';
import {container} from '../../../styles/GlobalStyles';
import {Const, trans} from '../../../utils';
import styles from './styles';
import moment from 'moment';
import FastImage from 'react-native-fast-image';
import {images} from '../../../assets';
import {Button, DropDown} from '../../../components/molecules';
import {Colors, Mixin} from '../../../styles';
import {useDispatch, useSelector} from 'react-redux';
import {get, post, uploadImage} from '../../../services/ServiceHandle';
import SimpleToast from 'react-native-simple-toast';
import {AuthenOverallRedux} from '../../../redux';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const AccountDetail = ({navigation}) => {
  const userInfo = useSelector(state => state.AuthenOverallReducer.userAuthen);
  const dispatch = useDispatch();

  const [fullName, setFullName] = useState(userInfo?.fullname);
  const [dateOfBirth, setDateOfBird] = useState(
    moment(userInfo?.dob).format('DD-MM-YYYY'),
  );
  const [bankNumber, setBankNumber] = useState(userInfo?.bankNumber);
  const [modalAvatar, setModalAvatar] = useState(false);
  const [modalBank, setModalBank] = useState(false);
  const [bankCode, setBankCode] = useState(userInfo?.bankCode);
  const [listBank, setListBank] = useState([]);

  const actions = [
    {
      title: 'Camera',
      type: 'capture',
      options: {
        saveToPhotos: true,
        mediaType: 'photo',
        includeBase64: false,
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
        includeBase64: false,
      },
    },
  ];

  console.log('bankCode', bankCode);

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
          console.log('convertData', convertData);
        } else {
          SimpleToast.show(res.error, SimpleToast.SHORT);
        }
      });
    };
    getListBank();
  }, []);

  const updateProfile = () => {
    const params = {
      fullname: fullName,
      dob: moment(dateOfBirth, 'DD-MM-YYYY').format(),
      bankNumber,
      bankCode,
    };

    post(Const.API.baseURL + Const.API.UpdateProfile, params).then(res => {
      if (res.ok) {
        dispatch(AuthenOverallRedux.Actions.getProfile.request());
        SimpleToast.show('Cập nhật thông tin thành công', SimpleToast.SHORT);
        navigation.goBack();
      } else {
        SimpleToast.show(res.error, SimpleToast.SHORT);
      }
    });
  };

  const updateAvatar = res => {
    if (res.didCancel) {
      console.log('didCancel');
    } else if (res.errorMessage) {
      console.log(res.errorMessage);
    } else {
      const formData = new FormData();

      formData.append('files', {
        uri: res.assets[0].uri,
        name: res.assets[0].fileName,
        type: res.assets[0].type,
      });

      post(Const.API.baseURL + Const.API.UploadAvatar, formData).then(
        result => {
          if (result.ok) {
            dispatch(AuthenOverallRedux.Actions.getProfile.request());
            setModalAvatar(false);
          } else {
            SimpleToast.show(result.error, SimpleToast.SHORT);
            setModalAvatar(false);
          }
        },
      );
    }
  };

  const handleImage = useCallback((type, options) => {
    if (type === 'capture') {
      launchCamera(options, updateAvatar);
    } else {
      launchImageLibrary(options, updateAvatar);
    }
  }, []);

  return (
    <View style={container}>
      <Appbar.Header>
        <Appbar.BackAction color="white" onPress={() => navigation.goBack()} />
        <Appbar.Content color="white" title={trans('accountDetail')} />
      </Appbar.Header>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.viewImg}
          onPress={() => setModalAvatar(true)}>
          <FastImage
            source={
              userInfo.avatar
                ? {uri: Const.API.baseURL + userInfo.avatar}
                : images.avatar
            }
            style={styles.image}
          />
          <View style={{position: 'absolute', bottom: 0, right: 8}}>
            <Icon name="camera" size={24} color={Colors.LIGHT_GREY} />
          </View>
        </TouchableOpacity>
        <FormInput
          placeholder="Họ và tên"
          value={fullName}
          onChangeText={setFullName}
          title={trans('firstAndLastName').toUpperCase()}
        />
        <FormInput
          type="selectDate"
          title={trans('dateOfBirth').toUpperCase()}
          valueDate={dateOfBirth}
          setValueDate={date =>
            setDateOfBird(moment(date).format('DD-MM-YYYY'))
          }
        />
        <DropDown
          placeholder={trans('chooseBank')}
          open={modalBank}
          setOpen={setModalBank}
          items={listBank}
          setItems={setListBank}
          value={bankCode}
          setValue={setBankCode}
          searchable
          searchPlaceholder={trans('search')}
        />
        <FormInput
          placeholder="Nhập chi nhánh"
          value={bankNumber}
          onChangeText={setBankNumber}
          title={trans('branch').toUpperCase()}
        />
        <FormInput
          placeholder="Số tài khoản"
          value={bankNumber}
          onChangeText={setBankNumber}
          title={trans('bankAccountNumber').toUpperCase()}
        />
        <Button
          onPress={updateProfile}
          title="Cập nhật"
          containerStyle={{
            alignSelf: 'center',
            marginTop: Mixin.moderateSize(28),
          }}
        />
      </View>
      <Modal
        isVisible={modalAvatar}
        onBackdropPress={() => setModalAvatar(false)}>
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
  );
};
export default AccountDetail;
