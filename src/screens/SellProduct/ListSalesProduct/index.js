import React, {useEffect, useRef, useState} from 'react';
import {
  Animated,
  FlatList,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {Appbar} from 'react-native-paper';
import SimpleToast from 'react-native-simple-toast';
import {useDispatch, useSelector} from 'react-redux';
import {
  Button,
  ItemProduct,
  SearchProduct,
} from '../../../components/molecules';
import IconCart from '../../../components/molecules/IconCart';
import ModalChangeQuantity from '../../../components/molecules/ModalChangeQuantity';
import {CartRedux} from '../../../redux';

import {get, post} from '../../../services/ServiceHandle';
import {container} from '../../../styles/GlobalStyles';
import {Const, trans} from '../../../utils';
import {SwipeListView} from 'react-native-swipe-list-view';
import CardItem from '../../../components/molecules/CardItem';
import {Mixin} from '../../../styles';
import styles from './styles';

const ListSalesProduct = ({navigation, route}) => {
  const {type} = route.params;

  const animationIsRunning = useRef(false);

  const [listProduct, setListProduct] = useState([]);
  const [listChooseProduct, setListChooseProduct] = useState([]);

  const rowTranslateAnimatedValues = {};
  listChooseProduct.map(elm => {
    rowTranslateAnimatedValues[elm.id] = new Animated.Value(1);
  });

  useEffect(() => {
    const getListProduct = () => {
      get(`${Const.API.baseURL + Const.API.Product}?type=${type}`).then(res => {
        if (res.ok) {
          setListProduct(res.data.data);
        }
      });
    };
    getListProduct();
  }, [type]);

  const goPayment = () => {
    navigation.navigate('PaymentOfSales', {
      dataProducts: listChooseProduct,
      type,
    });
  };

  const chooseProduct = item => {
    if (
      !listChooseProduct
        .map(elm => {
          return elm.id;
        })
        .includes(item.id)
    ) {
      const newList = [...listChooseProduct];
      newList.push({...item, ...{amount: 1}});
      setListChooseProduct(newList);
    }
  };

  const addAmount = item => {
    const newData = [...listChooseProduct].map(elm => {
      if (elm?.id === item?.id) {
        elm.amount += 1;
      }
      return elm;
    });
    setListChooseProduct(newData);
  };

  const lessAmount = item => {
    if (item.amount > 1) {
      const newData = [...listChooseProduct].map(elm => {
        if (elm?.id === item?.id) {
          elm.amount -= 1;
        }
        return elm;
      });
      setListChooseProduct(newData);
    }
  };

  const changeAmount = (valueInput, item) => {
    const newData = [...listChooseProduct].map(elm => {
      if (elm?.id === item?.id) {
        elm.amount = Number(valueInput);
      }
      return elm;
    });
    setListChooseProduct(newData);
  };

  const onSwipeValueChange = swipeData => {
    const {key, value} = swipeData;
    if (value < -Mixin.device_width && !animationIsRunning.current) {
      animationIsRunning.current = true;
      Animated.timing(rowTranslateAnimatedValues[key], {
        toValue: 0,
        duration: 200,
      }).start(() => {
        const newData = [...listChooseProduct].filter(item => item.id !== key);
        setListChooseProduct(newData);
        animationIsRunning.current = false;
      });
    }
  };

  const renderHiddenItem = () => (
    <View style={styles.rowBack}>
      <View style={[styles.backRightBtn, styles.backRightBtnRight]}>
        <Text style={styles.backTextWhite}>Delete</Text>
      </View>
    </View>
  );

  const renderItem = item => {
    return (
      <Animated.View
        style={[
          styles.rowFrontContainer,
          {
            height: rowTranslateAnimatedValues[item.id].interpolate({
              inputRange: [0, 1],
              outputRange: [0, 80],
            }),
          },
        ]}>
        <CardItem
          item={item}
          type="choose"
          addAmountProps={addAmount}
          lessAmountProps={lessAmount}
          onPress={() => addAmount(item)}
          changeAmountProps={changeAmount}
        />
      </Animated.View>
    );
  };

  return (
    <View style={container}>
      <Appbar.Header>
        <Appbar.BackAction
          color="white"
          onPress={() =>
            navigation.reset({
              index: 0,
              routes: [{name: trans('home')}],
            })
          }
        />
        <Appbar.Content
          style={{alignItems: 'center'}}
          color="white"
          title={type === 'online' ? 'Lên đơn online' : 'Bán tại cửa hàng'}
        />
      </Appbar.Header>
      {/* <TouchableWithoutFeedback> */}
      <SearchProduct data={listProduct} selectProduct={chooseProduct} />
      {/* </TouchableWithoutFeedback> */}
      <View style={{flex: 1}}>
        <SwipeListView
          disableRightSwipe
          data={listChooseProduct}
          renderItem={({item}) => renderItem(item)}
          renderHiddenItem={renderHiddenItem}
          rightOpenValue={-Mixin.device_width}
          previewRowKey={'0'}
          previewOpenValue={-40}
          previewOpenDelay={3000}
          onSwipeValueChange={onSwipeValueChange}
          useNativeDriver={false}
          keyExtractor={(item, index) => item.id}
        />
      </View>
      {listChooseProduct.length >= 1 && (
        <Button
          containerStyle={styles.btnPurchase}
          title={trans('createOrder')}
          onPress={goPayment}
        />
      )}
    </View>
  );
};

export default ListSalesProduct;
