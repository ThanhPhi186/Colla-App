import React from 'react';
import {FlatList, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Appbar} from 'react-native-paper';
import {trans} from '../../../utils';
import styles from './styles';
import moment from 'moment';
import {Colors, Mixin} from '../../../styles';
import FastImage from 'react-native-fast-image';
import {images} from '../../../assets';

const PromotionScreen = ({navigation}) => {
  const data = [
    {
      code: 'Giảm 60k cho đơn 150',
      time_end: 1622486118597,
    },
    {
      code: 'Giảm 25k phí giao hàng',
      time_end: 1622486118597,
    },
    {
      code: 'Giảm 50k khi đặt hàng qua pay Pay',
      time_end: 1622486118597,
    },
  ];

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.containerItem}
        // onPress={() => this.onDetail(data)}
      >
        <View
          style={{
            flex: 0.15,
            backgroundColor: Colors.GREEN_1,
            borderTopLeftRadius: Mixin.moderateSize(8),
            borderBottomLeftRadius: Mixin.moderateSize(8),
          }}></View>
        <View style={styles.left}>
          <FastImage source={images.discount} style={{width: 50, height: 50}} />
          <View style={{marginLeft: 12, flex: 1}}>
            <Text style={styles.textTitle}>{item.code}</Text>
            <Text style={styles.textPrice}>
              HSD: {moment(item.time_end).format('DD.MM.YYYY')}
            </Text>
          </View>
        </View>
        <View>
          <View style={{flex: 1}} />
          <View style={{borderWidth: 0.5, borderColor: '#f5f5f5', flex: 1}} />
          <View style={{flex: 1}} />
          <View style={{borderWidth: 0.5, borderColor: '#f5f5f5', flex: 1}} />
          <View style={{flex: 1}} />
          <View style={{borderWidth: 0.5, borderColor: '#f5f5f5', flex: 1}} />
          <View style={{flex: 1}} />
          <View style={{borderWidth: 0.5, borderColor: '#f5f5f5', flex: 1}} />
          <View style={{flex: 1}} />
          <View style={{borderWidth: 0.5, borderColor: '#f5f5f5', flex: 1}} />
          <View style={{flex: 1}} />
        </View>
        <View style={styles.right}>
          <Text style={styles.textValue}>Chọn</Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={{flex: 1, backgroundColor: Colors.LIGHT_GREY}}>
      <Appbar.Header>
        <Appbar.BackAction color="white" onPress={() => navigation.goBack()} />
        <Appbar.Content color="white" title={trans('myOffer')} />
      </Appbar.Header>
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};

export default PromotionScreen;
