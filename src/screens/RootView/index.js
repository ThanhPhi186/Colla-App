import React, {useEffect} from 'react';
import {View} from 'react-native';

import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {Colors} from '../../styles';
const RootView = props => {
  return (
    <SafeAreaProvider>
      {/* <SafeAreaView style={{flex: 1, backgroundColor: Colors.PRIMARY}}>
        {props.children}
      </SafeAreaView> */}
      <View style={{flex: 1}}>{props.children}</View>
    </SafeAreaProvider>
  );
};

export default RootView;
