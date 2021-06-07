import React from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Appbar} from 'react-native-paper';
import {images} from '../../assets';
import {AppText} from '../../components/atoms';
import {container} from '../../styles/GlobalStyles';
import {trans} from '../../utils';

const TopSales = ({navigation}) => {
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
        source={images.TopSaleT7}
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
