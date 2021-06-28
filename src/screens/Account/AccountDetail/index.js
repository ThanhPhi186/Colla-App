import React, {useState} from 'react';
import {View} from 'react-native';
import {Appbar} from 'react-native-paper';
import {FormInput} from '../../../components/atoms';
import {container} from '../../../styles/GlobalStyles';
import {trans} from '../../../utils';
import styles from './styles';
import moment from 'moment';
import FastImage from 'react-native-fast-image';
import {images} from '../../../assets';
import {Button} from '../../../components/molecules';
import {Mixin} from '../../../styles';

const AccountDetail = ({navigation}) => {
  const [dateOfBirth, setDateOfBird] = useState(moment().format('DD-MM-YYYY'));

  return (
    <View style={container}>
      <Appbar.Header>
        <Appbar.BackAction color="white" onPress={() => navigation.goBack()} />
        <Appbar.Content color="white" title={trans('accountDetail')} />
      </Appbar.Header>
      <View style={styles.container}>
        <FastImage source={images.avatar} style={styles.image} />
        <FormInput title={trans('firstAndLastName').toUpperCase()} />
        <FormInput title={trans('phoneNumber').toUpperCase()} />
        <FormInput
          type="selectDate"
          title={trans('dateOfBirth').toUpperCase()}
          valueDate={dateOfBirth}
          setValueDate={date =>
            setDateOfBird(moment(date).format('DD-MM-YYYY'))
          }
        />
        <FormInput title={trans('bankAccountNumber').toUpperCase()} />
        <Button
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
