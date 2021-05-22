import React from 'react';
import {TextInput, View} from 'react-native';

import {images} from '../../assets';
import {Colors, Mixin} from '../../styles';
import {FONT_SIZE_14} from '../../styles/Typography';
import {AppImage} from '../atoms';

const AppInput = props => {
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
