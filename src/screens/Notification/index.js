import React from 'react';
import {FlatList, TouchableOpacity, View} from 'react-native';
import {Appbar} from 'react-native-paper';
import {AppText} from '../../components/atoms';
import {Colors, Mixin} from '../../styles';
import {container} from '../../styles/GlobalStyles';
import {trans} from '../../utils';
import styles from './styles';
import moment from 'moment';
import FastImage from 'react-native-fast-image';
import {images} from '../../assets';

const NotificationScreen = ({navigation}) => {
  const data = [
    {
      status: false,
      message: 'Reminder: You better be ready! flight is tomorrow at 9am',
      created_at: 1622619872597,
    },
    {
      status: false,
      message: 'Reminder: You have 1 invitation tonight at 17pm',
      created_at: 1622586118597,
    },
    {
      status: true,
      message: 'Reminder: You transfer from the hotel to airport at 5pm',
      created_at: 1622501213597,
    },
    {
      status: false,
      message: 'Offer: Off-Season will end in 20 Oct get it now',
      created_at: 1622486118597,
    },
  ];

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={[
          styles.item,
          ,
          {backgroundColor: item.status ? null : '#e1f5fe'},
        ]}
        // onPress={() => this.onGotoDetail(item)}
      >
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <View
            style={{
              width: Mixin.moderateSize(44),
              height: Mixin.moderateSize(44),
              borderRadius: Mixin.moderateSize(22),
              backgroundColor: Colors.GREEN_2,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <FastImage
              source={images.noti}
              style={{
                width: Mixin.moderateSize(32),
                height: Mixin.moderateSize(32),
              }}
            />
          </View>
        </View>
        <View style={styles.box}>
          <AppText style={styles.title_text} numberOfLines={3}>
            {item.message}
          </AppText>
          <AppText style={styles.time_text} numberOfLines={1}>
            {moment(item.created_at).fromNow()}
          </AppText>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={container}>
      <Appbar.Header>
        <Appbar.BackAction color="white" onPress={() => navigation.goBack()} />
        <Appbar.Content color="white" title={trans('notification')} />
      </Appbar.Header>

      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};

export default NotificationScreen;
