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

const listProduct = [
  {
    description: 'Test',
    id: '60a0bab5a7caa1393653f9481',
    name: 'Test1',
    photo: 'images/2021/5/89adfb7d-b167-4936-a790-c57a6b652c73.jpg',
    price: 1000,
  },
  {
    description: 'Test',
    id: '60a0bab5a7caa1393653f9482',
    name: 'Test2',
    photo: 'images/2021/5/89adfb7d-b167-4936-a790-c57a6b652c73.jpg',
    price: 2000,
  },
  {
    description: 'Test',
    id: '60a0bab5a7caa1393653f9483',
    name: 'Test3',
    photo: 'images/2021/5/89adfb7d-b167-4936-a790-c57a6b652c73.jpg',
    price: 3000,
  },
  {
    description: 'Test',
    id: '60a0bab5a7caa1393653f9484',
    name: 'Test4',
    photo: 'images/2021/5/89adfb7d-b167-4936-a790-c57a6b652c73.jpg',
    price: 4000,
  },
  {
    description: 'Test',
    id: '60a0bab5a7caa1393653f9485',
    name: 'Test5',
    photo: 'images/2021/5/89adfb7d-b167-4936-a790-c57a6b652c73.jpg',
    price: 5000,
  },
  {
    description: 'Test',
    id: '60a0bab5a7caa1393653f9486',
    name: 'Test6',
    photo: 'images/2021/5/89adfb7d-b167-4936-a790-c57a6b652c73.jpg',
    price: 6000,
  },
  {
    description: 'Test',
    id: '60a0bab5a7caa1393653f9487',
    name: 'Test7',
    photo: 'images/2021/5/89adfb7d-b167-4936-a790-c57a6b652c73.jpg',
    price: 7000,
  },
];

const ListProduct = ({navigation}) => {
  // const [listProduct, setListProduct] = useState([]);
  // useEffect(() => {
  //   const getListProduct = () => {
  //     get(Const.API.baseURL + Const.API.GetListProduct).then(res => {
  //       if (res.ok) {
  //         setListProduct(res.data.data);
  //       }
  //     });
  //   };
  //   getListProduct();
  // }, []);

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
