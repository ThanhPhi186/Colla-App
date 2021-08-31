import React from 'react';
import { View, Dimensions, ScrollView } from 'react-native';
import { Appbar } from 'react-native-paper';
import AutoHeightWebView from 'react-native-autoheight-webview'
import AutoHeightImage from 'react-native-auto-height-image';
import moment from 'moment';

import { AppText } from '../../components/atoms';
import { Colors } from '../../styles';

import { container } from '../../styles/GlobalStyles';
import { trans } from '../../utils';
import {device_width} from '../../styles/Mixin';
import {Const} from '../../utils';

const DetailBlog = ({ navigation, route }) => {
  const { item } = route.params;

  const regex = /(<([^>]+)>)/gi;

  return (
    <View style={container}>
      <Appbar.Header>
        <Appbar.BackAction color="white" onPress={() => navigation.goBack()} />
        <Appbar.Content color="white" title={trans('detailBlog')} />
      </Appbar.Header>
      <ScrollView style={{ flex: 1, marginTop: 0 }}>
        <AppText style={{ marginTop: 18, marginBottom: 8, paddingHorizontal: 15, fontWeight: 'bold', fontSize: 20,}}>
          {item.title}
        </AppText>
        <AppText style={{ paddingBottom: 10, paddingHorizontal: 15, }}>
          {moment(item.createdAt).format('DD/MM/YYYY')}
        </AppText>
        <AutoHeightImage
          width={device_width}
          source={{
            uri: Const.API.baseUrlImage + item.feature_image,
          }}
        />
        <AutoHeightWebView
          style={{ width: Dimensions.get('window').width - 30, marginTop: 10, marginBottom: 15, marginHorizontal: 15, }}
          source={{ html: item?.content }}
          scalesPageToFit={false}
          customStyle={`
            img {
              max-width: 100%;
            }
          `}
          viewportContent={'width=device-width, user-scalable=no'}
        />
      </ScrollView>
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
