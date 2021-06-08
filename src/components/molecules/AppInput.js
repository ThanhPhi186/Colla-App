import React, {useState} from 'react';
import {TextInput, TouchableOpacity, View} from 'react-native';

import {images} from '../../assets';
import {Colors, Mixin} from '../../styles';
import {FONT_SIZE_14} from '../../styles/Typography';
import {AppImage} from '../atoms';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const AppInput = props => {
  const {type} = props;

  const [secure, setSecure] = useState(true);
  if (type === 'password') {
    return (
      <View style={styles.viewInput}>
        <TextInput
          {...props}
          style={{flex: 1, paddingRight: 8}}
          secureTextEntry={secure}
        />
        <TouchableOpacity onPress={() => setSecure(!secure)}>
          <Icon
            name={'eye-outline'}
            size={24}
            style={styles.ic}
            color={Colors.GRAY}
          />
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <AppImage
        source={images.noImage}
        imageStyle={{width: 30, height: 30, marginRight: 20}}
      />
      <TextInput {...props} style={styles.txtInput} />
    </View>
  );
};

const styles = {
  viewInput: {
    flexDirection: 'row',
    width: '100%',
    height: 40,
    marginBottom: 8,
    borderWidth: 0.5,
    borderColor: 'gray',
    paddingHorizontal: 8,
    borderRadius: 8,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  txtInput: {
    height: '100%',
    flex: 1,
    borderBottomWidth: 1,
    borderColor: 'gray',
    fontSize: FONT_SIZE_14,
    color: Colors.BLACK,
  },
};
export default AppInput;
