import React, {useState} from 'react';
import {Keyboard, TouchableWithoutFeedback, View} from 'react-native';
import {Appbar, Switch, TextInput} from 'react-native-paper';
import {AppText} from '../../../components/atoms';
import {Button} from '../../../components/molecules';
import {Colors} from '../../../styles';
import {container} from '../../../styles/GlobalStyles';
import {trans} from '../../../utils';

const AddNewAddress = ({navigation}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [valueSwitch, setValueSwitch] = useState(false);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={container}>
        <Appbar.Header>
          <Appbar.BackAction
            color="white"
            onPress={() => navigation.goBack()}
          />
          <Appbar.Content color="white" title={trans('addNewAddress')} />
        </Appbar.Header>

        <TextInput
          style={{backgroundColor: Colors.WHITE, marginVertical: 16}}
          label={trans('recipientName')}
          value={name}
          onChangeText={setName}
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

          <Button title={trans('save').toUpperCase()} />
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
