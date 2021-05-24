import React, {useEffect, useState} from 'react';
import {FlatList, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Appbar} from 'react-native-paper';
import {AppText} from '../../../components/atoms';
import {container} from '../../../styles/GlobalStyles';
import {Const, trans} from '../../../utils';
import {images} from '../../../assets';
import {get} from '../../../services/ServiceHandle';

import {ItemProduct} from '../../../components/molecules';
import IconCart from '../../../components/molecules/IconCart';

const ListProduct = ({navigation}) => {
  const [listProduct, setListProduct] = useState([]);
  useEffect(() => {
    const getListProduct = () => {
      get(Const.API.baseURL + Const.API.GetListProduct).then(res => {
        if (res.ok) {
          setListProduct(res.data.data);
        }
      });
    };
    getListProduct();
  }, []);

  const renderItem = item => {
    return (
      <ItemProduct
        item={item}
        onPress={() => navigation.navigate('DetailProduct', {item})}
      />
    );
  };

  return (
    <View style={container}>
      <Appbar.Header>
        <Appbar.BackAction color="white" onPress={() => navigation.goBack()} />
        <Appbar.Content color="white" title={trans('listProduct')} />
        <IconCart onPress={() => navigation.navigate('CartScreen')} />
      </Appbar.Header>
      <View style={{flex: 1}}>
        <FlatList
          data={listProduct}
          columnWrapperStyle={{flexWrap: 'wrap'}}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => renderItem(item)}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{
            paddingVertical: 10,
          }}
        />
      </View>
    </View>
  );
};

export default ListProduct;
