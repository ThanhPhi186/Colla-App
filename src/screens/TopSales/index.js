import React from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Appbar} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {images} from '../../assets';
import {AppText} from '../../components/atoms';
import {container} from '../../styles/GlobalStyles';
import {Const, trans} from '../../utils';

const TopSales = ({navigation}) => {
  const appConfig = useSelector(state => state.AppConfigReducer.appConfig);
  const dataSales = [];

  const renderItem = ({item}) => {
    return (
      <View>
        <Text>AAA</Text>
      </View>
    );
  };
  return (
    <View style={container}>
      <Appbar.Header>
        <Appbar.BackAction color="white" onPress={() => navigation.goBack()} />
        <Appbar.Content color="white" title={'Top Saler'} />
      </Appbar.Header>
      <FastImage
        source={{
          uri: Const.API.baseUrlImage + appConfig?.general?.topSalerBanner,
        }}
        style={{width: '100%', height: 200}}
        resizeMode="stretch"
      />

      <FlatList
        data={dataSales}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};
export default TopSales;
