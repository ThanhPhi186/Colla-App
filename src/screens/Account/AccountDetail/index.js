import React, {useCallback, useEffect, useState} from 'react';
import {Pressable, Text, TouchableOpacity, View} from 'react-native';
import {Appbar} from 'react-native-paper';
import {FormInput} from '../../../components/atoms';
import {container} from '../../../styles/GlobalStyles';
import {Const, trans} from '../../../utils';
import styles from './styles';
import moment from 'moment';
import FastImage from 'react-native-fast-image';
import {images} from '../../../assets';
import {Button} from '../../../components/molecules';
import {Mixin} from '../../../styles';
import {useDispatch, useSelector} from 'react-redux';
import {post, uploadImage} from '../../../services/ServiceHandle';
import SimpleToast from 'react-native-simple-toast';
import {AuthenOverallRedux} from '../../../redux';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const actions = [
  {
    title: 'Take Image',
    type: 'capture',
    options: {
      saveToPhotos: true,
      mediaType: 'photo',
      includeBase64: false,
    },
  },
  {
    title: 'Select Image',
    type: 'library',
    options: {
      maxHeight: 200,
      maxWidth: 200,
      selectionLimit: 1,
      mediaType: 'photo',
      includeBase64: false,
    },
  },
  {
    title: 'Take Video',
    type: 'capture',
    options: {
      saveToPhotos: true,
      mediaType: 'video',
    },
  },
  {
    title: 'Select Video',
    type: 'library',
    options: {
      selectionLimit: 0,
      mediaType: 'video',
    },
  },
  {
    title: `Select Image or Video\n(mixed)`,
    type: 'library',
    options: {
      selectionLimit: 0,
      mediaType: 'mixed',
    },
  },
];

const AccountDetail = ({navigation}) => {
  const userInfo = useSelector(state => state.AuthenOverallReducer.userAuthen);
  const dispatch = useDispatch();

  const [fullName, setFullName] = useState(userInfo?.fullname);
  const [dateOfBirth, setDateOfBird] = useState(
    moment(userInfo?.dob).format('DD-MM-YYYY'),
  );
  const [bankNumber, setBankNumber] = useState(userInfo?.bankNumber);
  const [responseImg, setResponseImg] = useState(null);

  console.log('responseImg', responseImg);

  const updateProfile = () => {
    const params = {
      fullname: fullName,
      dob: moment(dateOfBirth, 'DD-MM-YYYY').format(),
      bankNumber,
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

      formData.append('sourcePath', res.assets[0].uri);
      uploadImage(Const.API.baseURL + Const.API.UploadAvatar, formData).then(
        result => {
          if (result.ok) {
          } else {
            SimpleToast.show(result.error, SimpleToast.SHORT);
          }
        },
      );
    }
  };

  const handleImage = useCallback((type, options) => {
    if (type === 'capture') {
      launchCamera(options, setResponseImg);
    } else {
      launchImageLibrary(options, updateAvatar);
    }
  }, []);

  const DemoButton = (onPress, title) => {
    return (
      <Pressable
        onPress={onPress}
        style={({pressed}) => [
          {
            backgroundColor: pressed ? 'skyblue' : 'steelblue',
          },
          styles.container,
        ]}>
        <Text style={styles.text}>{title}</Text>
      </Pressable>
    );
  };

  return (
    <View style={container}>
      <Appbar.Header>
        <Appbar.BackAction color="white" onPress={() => navigation.goBack()} />
        <Appbar.Content color="white" title={trans('accountDetail')} />
      </Appbar.Header>
      <View style={styles.container}>
        {actions.map(({title, type, options}) => {
          return DemoButton(() => handleImage(type, options), title);
        })}

        {/* <TouchableOpacity onPress={handleImage}> */}
        <FastImage
          source={{uri: responseImg?.assets[0]?.uri}}
          style={styles.image}
        />
        {/* </TouchableOpacity> */}
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
    </View>
  );
};
export default AccountDetail;
