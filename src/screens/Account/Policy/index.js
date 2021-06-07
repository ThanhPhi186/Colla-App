import React from 'react';
import {View} from 'react-native';
import {Appbar} from 'react-native-paper';
import {AppText} from '../../../components/atoms';
import {container} from '../../../styles/GlobalStyles';
import {trans} from '../../../utils';
import styles from './styles';

const Policy = ({navigation}) => {
  return (
    <View style={container}>
      <Appbar.Header>
        <Appbar.BackAction color="white" onPress={() => navigation.goBack()} />
        <Appbar.Content color="white" title={trans('policy')} />
      </Appbar.Header>
      <View style={{padding: 16}}>
        <AppText title style={styles.txt}>
          - Nhận Điểm khi giới thiệu thành công Đại Lý/CTV mới (F1)
        </AppText>
        <AppText title style={styles.txt}>
          - Được hưởng 03% tổng doanh số bán hàng của Đại Lý/CTV (F1)
        </AppText>
        <AppText title style={styles.txt}>
          - Được ghi nhận danh sách Đại Lý/CTV từ F1
        </AppText>
        <AppText title style={styles.txt}>
          – Fn (để được hưởng % doanh số bán hàng khi trở thành Đại Lý Gold
        </AppText>
      </View>
    </View>
  );
};
export default Policy;
