import React from 'react';
import {View} from 'react-native';
import {Appbar} from 'react-native-paper';
import {AppText} from '../../components/atoms';
import {Colors} from '../../styles';

import {container} from '../../styles/GlobalStyles';
import {trans} from '../../utils';

const DetailBlog = ({navigation, route}) => {
  const {item} = route.params;

  const regex = /(<([^>]+)>)/gi;

  return (
    <View style={container}>
      <Appbar.Header>
        <Appbar.BackAction color="white" onPress={() => navigation.goBack()} />
        <Appbar.Content color="white" title={trans('detailBlog')} />
      </Appbar.Header>
      <View style={{flex: 1, marginTop: 8}}>
        <AppText style={{marginBottom: 8, paddingHorizontal: 16}} title>
          {item.title}
        </AppText>
        <View style={styles.largeIndicate} />
        <AppText title style={{marginTop: 8, paddingHorizontal: 16}}>
          {item?.content?.replace(regex, '')}
        </AppText>
      </View>
    </View>
  );
};

export default DetailBlog;

const styles = {
  largeIndicate: {
    width: '100%',
    height: 7,
    backgroundColor: Colors.WHITE_SMOKE,
  },
};
