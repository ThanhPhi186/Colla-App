import React, { useState, useEffect } from 'react';
import {FlatList, Text, TouchableOpacity, View, RefreshControl} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Appbar} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {images} from '../../assets';
import {AppText} from '../../components/atoms';
import {container} from '../../styles/GlobalStyles';
import {Const, trans} from '../../utils';
import AutoHeightImage from 'react-native-auto-height-image';
import {device_width} from '../../styles/Mixin';
import {Colors} from '../../styles';
import numeral from 'numeral';
import {
  FONT_SIZE_14,
  FONT_SIZE_16,
  FONT_SIZE_20,
} from '../../styles/Typography';
import {get} from '../../services/ServiceHandle';

const TopSales = ({navigation}) => {
  const appConfig = useSelector(state => state.AppConfigReducer.appConfig);
  const [dataSales, setDataSales] = useState([]);
  const [month, setMonth] = useState(0);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    setLoading(true);
    const params = {};
    get(Const.API.baseURL + Const.API.TopSaler, params).then(res => {
      if (res.ok) {
        const { month, topSaler } = res.data.data;

        setMonth(month);
        setDataSales(topSaler);
        setLoading(false);
      } else {
        setLoading(false);
        setTimeout(() => {
          SimpleToast.show(res.error, SimpleToast.SHORT);
        }, 700);
      }
    });
  }, []);

  const onRefresh = () => {
    setRefresh(true);
    const params = {};
    get(Const.API.baseURL + Const.API.TopSaler, params).then(res => {
      if (res.ok) {
        const { month, topSaler } = res.data.data;

        setMonth(month);
        setDataSales(topSaler);
        setRefresh(false);
      } else {
        setRefresh(false);
        setTimeout(() => {
          SimpleToast.show(res.error, SimpleToast.SHORT);
        }, 700);
      }
    });
  };

  const renderItem = ({item, index}) => {
    return (
      <View
        style={{
          alignSelf: 'center',
          width: '90%',
          backgroundColor: Colors.WHITE,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
          marginTop: 8,
          marginBottom: 16,
          padding: 20,
          borderRadius: 12,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <AppText containerStyle={{ flex: 6 }} numberOfLines={1}>
          {index + 1}. {item.fullname} ({item.affiliateCode})
        </AppText>
        <AppText containerStyle={{ flex: 4 }} style={{textAlign: 'right'}}>{numeral(item.revenue).format()} đ</AppText>
      </View>
    );
  };

  return (
    <View style={container}>
      <Appbar.Header>
        <Appbar.BackAction color="white" onPress={() => navigation.goBack()} />
        <Appbar.Content color="white" title={'Top Seller'} />
      </Appbar.Header>

      <AutoHeightImage
        width={device_width}
        source={{
          uri: Const.API.baseUrlImage + appConfig?.general?.topSalerBanner,
        }}
      />

      <FlatList
        data={dataSales}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{paddingBottom: 16}}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refresh} onRefresh={onRefresh} />
        }
      />
    </View>
  );
};
export default TopSales;
