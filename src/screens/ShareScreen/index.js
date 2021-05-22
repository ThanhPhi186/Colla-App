import React from 'react';
import {View} from 'react-native';
import {Appbar} from 'react-native-paper';
import {AppText} from '../../components/atoms';
import {trans} from '../../utils';

const ShareScreen = () => {
  return (
    <Appbar.Header>
      <Appbar.Content
        style={{alignItems: 'center'}}
        color="white"
        title={trans('share')}
      />
    </Appbar.Header>
  );
};

export default ShareScreen;
