import React from 'react';
import {View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {images} from '../../../../assets';
import {AppText} from '../../../../components/atoms';
import {Colors} from '../../../../styles';
import {container} from '../../../../styles/GlobalStyles';
import styles from './styles';
import numeral from 'numeral';

const Inventory = () => {
  return (
    <View style={styles.container}>
      <View style={styles.viewInventory}>
        <View
          style={{
            backgroundColor: '#009CE3',
            width: 50,
            height: 50,
            borderRadius: 25,
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            marginVertical: 20,
          }}>
          <FastImage source={images.box} style={{width: 40, height: 40}} />
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: 'space-around',
            alignItems: 'center',
            borderBottomWidth: 1,
            borderColor: Colors.LIGHT_GREY,
            paddingBottom: 16,
          }}>
          <AppText title>TỒN KHO CUỐI KỲ</AppText>
          <AppText title style={{color: Colors.GREEN_1, fontWeight: 'bold'}}>
            {numeral(34200000).format()}
          </AppText>
          <AppText title>SL : {numeral(1380).format()}</AppText>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
            flex: 1,
            alignItems: 'center',
            borderBottomWidth: 1,
            borderColor: Colors.LIGHT_GREY,
          }}>
          <View style={{alignItems: 'center'}}>
            <AppText title style={{color: Colors.GRAY}}>
              Nhập trong kỳ
            </AppText>
            <AppText title style={{marginTop: 8, fontWeight: 'bold'}}>
              {numeral(56000000).format()}
            </AppText>
          </View>
          <View style={{alignItems: 'center'}}>
            <AppText title style={{color: Colors.GRAY}}>
              Xuất trong kỳ
            </AppText>
            <AppText title style={{marginTop: 8, fontWeight: 'bold'}}>
              {numeral(21800000).format()}
            </AppText>
          </View>
        </View>
        <View style={{flex: 1, justifyContent: 'space-around'}}>
          <AppText>Giá trị tồn kho = Số lượng * Giá vốn</AppText>
          <AppText>
            Giá vốn (MAC) là bình quân sản phẩm được tính sau mỗi lần nhập hàng
          </AppText>
        </View>
      </View>
      <View style={{flex: 1}}></View>
    </View>
  );
};

export default Inventory;
