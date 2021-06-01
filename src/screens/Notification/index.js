import React from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import {Appbar} from 'react-native-paper';
import {Colors} from '../../styles';
import {container} from '../../styles/GlobalStyles';
import {trans} from '../../utils';
import styles from './styles';

const NotificationScreen = ({navigation}) => {
  const data = [
    {
      status: true,
      title: 'aaaaa',
      message: 'bbbbb',
      content: 'cccc',
      created_at: 'dddd',
    },
  ];
  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={[
          styles.item,
          ,
          {backgroundColor: item.status ? null : Colors.PRIMARY},
        ]}
        // onPress={() => this.onGotoDetail(item)}
      >
        <View style={{flex: 1}}>
          {/* <Icon type={constants.NOTIFICATION_TYPE.LOGO_APP} /> */}
        </View>
        <View style={styles.box}>
          <Text style={styles.title_text} ellipsizeMode="tail">
            {item.title}
          </Text>
          <Text
            style={styles.title_text}
            ellipsizeMode="tail"
            numberOfLines={3}>
            {item.message}
          </Text>
          <View style={{marginRight: 4}}>
            <Text
              style={styles.content_text}
              numberOfLines={3}
              ellipsizeMode="tail">
              {item.content}
            </Text>
          </View>

          <Text style={styles.time_text} numberOfLines={1} ellipsizeMode="tail">
            {item.created_at}
          </Text>
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
