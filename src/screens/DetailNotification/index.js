import React from 'react';
import {View} from 'react-native';
import {Appbar} from 'react-native-paper';
import {AppText} from '../../components/atoms';
import {Colors} from '../../styles';

import {container} from '../../styles/GlobalStyles';
import {trans} from '../../utils';

const DetailNotification = ({navigation, route}) => {
  const {item} = route.params;

  return (
    <View style={container}>
      <Appbar.Header>
        <Appbar.BackAction color="white" onPress={() => navigation.goBack()} />
        <Appbar.Content color="white" title={trans('detailNoti')} />
      </Appbar.Header>
      <View style={{flex: 1, marginTop: 8}}>
        <AppText style={{marginBottom: 8, paddingHorizontal: 16}} title>
          {item.notification_id.title}
        </AppText>
        <View style={styles.largeIndicate} />
        <AppText title style={{marginTop: 8, paddingHorizontal: 16}}>
          {item.notification_id.content}
        </AppText>
      </View>
    </View>
  );
};

export default DetailNotification;

const styles = {
  largeIndicate: {
    width: '100%',
    height: 7,
    backgroundColor: Colors.WHITE_SMOKE,
  },
};
