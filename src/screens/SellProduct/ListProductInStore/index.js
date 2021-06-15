import React, {useEffect, useState} from 'react';
import {FlatList, View} from 'react-native';
import {Appbar} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {ItemProduct} from '../../../components/molecules';
import IconCart from '../../../components/molecules/IconCart';
import {SalesCartRedux} from '../../../redux';
import {get} from '../../../services/ServiceHandle';
import {container} from '../../../styles/GlobalStyles';
import {Const, trans} from '../../../utils';

const ListProductInStore = ({navigation}) => {
  const numberProductCart = useSelector(
    state => state.SalesCartReducer.numberSalesCart,
  );
  const dispatch = useDispatch();
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

  const addToSalesCart = item => {
    const salesCartItem = {...item, ...{amount: 1}};

    dispatch(SalesCartRedux.Actions.addSalesCart(salesCartItem));
  };

  const renderItem = item => {
    return (
      <ItemProduct
        item={item}
        // onPress={() => navigation.navigate('DetailProduct', {item})}
        addToCart={() => addToSalesCart(item)}
      />
    );
  };

  return (
    <View style={container}>
      <Appbar.Header>
        <Appbar.Content
          style={{alignItems: 'center'}}
          color="white"
          title={trans('listProduct')}
        />
        <IconCart
          number={numberProductCart}
          onPress={() => navigation.navigate('SalesCart')}
        />
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

export default ListProductInStore;
