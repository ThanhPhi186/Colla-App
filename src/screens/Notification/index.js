import React, {useEffect, useState} from 'react';
import {FlatList, TouchableOpacity, View} from 'react-native';
import {Appbar} from 'react-native-paper';
import {AppLoading, AppText} from '../../components/atoms';
import {Colors, Mixin} from '../../styles';
import {container} from '../../styles/GlobalStyles';
import {Const, trans} from '../../utils';
import styles from './styles';
import moment from 'moment';
import FastImage from 'react-native-fast-image';
import {images} from '../../assets';

import SimpleToast from 'react-native-simple-toast';
import {get, post, put} from '../../services/ServiceHandle';
import {NotificationRedux} from '../../redux';
import {useDispatch} from 'react-redux';

const NotificationScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getNoti = () => {
      get(Const.API.baseURL + Const.API.Notification).then(res => {
        if (res.ok) {
          setData(res.data.data);
        } else {
          SimpleToast.show(res.error, SimpleToast.SHORT);
        }
      });
    };
    getNoti();
  }, []);

  const readNoti = item => {
    setLoading(true);
    const params = {
      is_read: true,
    };
    put(
      `${Const.API.baseURL + Const.API.Notification}/${item.id}`,
      params,
    ).then(res => {
      if (res.ok) {
        const newData = [...data];
        newData.map(elm => {
          if (elm.id === item.id) {
            elm.is_read = true;
          }
          return elm;
        });
        setData(newData);
        dispatch(NotificationRedux.Actions.getCountNotiUnread.request());
        setLoading(false);
      } else {
        setLoading(false);
        SimpleToast.show(res.error, SimpleToast.SHORT);
      }
    });
  };

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={[
          styles.item,
          ,
          {
            backgroundColor: item.is_read ? null : '#e1f5fe',
          },
        ]}
        onPress={() => readNoti(item)}>
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
            {item.notification_id.title}
          </AppText>
          <AppText style={styles.content} numberOfLines={3}>
            {item.notification_id.content}
          </AppText>
          <AppText style={styles.time_text} numberOfLines={1}>
            {moment(item.createdAt).fromNow()}
          </AppText>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={container}>
      <AppLoading isVisible={loading} />
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
