import React from 'react';
import {View} from 'react-native';
import {Appbar} from 'react-native-paper';
import {AppText} from '../../components/atoms';
import {trans} from '../../utils';

const ContactScreen = () => {
  return (
    <View>
      <Appbar.Header>
        <Appbar.Content
          style={{alignItems: 'center'}}
          color="white"
          title={trans('help')}
        />
      </Appbar.Header>
    </View>
  );
};

export default ContactScreen;
