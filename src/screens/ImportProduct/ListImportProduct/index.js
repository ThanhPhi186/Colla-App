// import React, {useEffect, useRef, useState} from 'react';
// import {FlatList, View} from 'react-native';
// import {Appbar} from 'react-native-paper';
// import SimpleToast from 'react-native-simple-toast';
// import {useDispatch, useSelector} from 'react-redux';
// import {Button, ItemProduct} from '../../../components/molecules';
// import IconCart from '../../../components/molecules/IconCart';
// import ModalChangeQuantity from '../../../components/molecules/ModalChangeQuantity';
// import {getBottomSpace} from '../../../helpers/iphoneXHelper';
// import {CartRedux} from '../../../redux';

// import {get, post} from '../../../services/ServiceHandle';
// import {Colors, Mixin} from '../../../styles';
// import {container} from '../../../styles/GlobalStyles';
// import {Const, trans} from '../../../utils';
// import styles from './styles';

// const ListImportProduct = ({navigation}) => {
//   const numberImportCart = useSelector(
//     state => state.CartReducer.numberImportCart,
//   );
//   const dispatch = useDispatch();
//   const refModal = useRef();

//   const [listProduct, setListProduct] = useState([]);
//   const [visibleModal, setVisibleModal] = useState(false);
//   const [itemProduct, setItemProduct] = useState();

//   useEffect(() => {
//     const getListProduct = () => {
//       get(`${Const.API.baseURL + Const.API.Product}?type=import`).then(res => {
//         if (res.ok) {
//           setListProduct(res.data.data);
//         }
//       });
//     };
//     getListProduct();
//   }, []);

//   useEffect(() => {
//     dispatch(CartRedux.Actions.getImportCart.request());
//   }, [dispatch]);

//   const addToImportCard = () => {
//     const dataProduct = {
//       product_id: itemProduct.id,
//       amount: refModal.current,
//       type: 'import',
//     };
//     post(Const.API.baseURL + Const.API.Cart, dataProduct).then(res => {
//       if (res.ok) {
//         dispatch(CartRedux.Actions.getImportCart.request());
//         setVisibleModal(false);
//         setTimeout(() => {
//           SimpleToast.show('Thêm sản phẩm thành công', SimpleToast.SHORT);
//         }, 500);
//       } else {
//         SimpleToast.show(res.error, SimpleToast.SHORT);
//       }
//     });
//   };

//   const goCart = () => {
//     navigation.navigate('ImportCart');
//   };

//   const renderItem = item => {
//     return (
//       <ItemProduct
//         disabled
//         item={item}
//         // onPress={() => navigation.navigate('DetailProduct', {item})}
//         addToCart={() => {
//           setItemProduct(item);
//           setVisibleModal(true);
//         }}
//       />
//     );
//   };

//   return (
//     <View style={container}>
//       <Appbar.Header>
//         <Appbar.BackAction
//           color={Colors.WHITE}
//           onPress={() => navigation.goBack()}
//         />
//         <Appbar.Content
//           style={{alignItems: 'center'}}
//           color="white"
//           title={trans('listProduct')}
//         />
//         <IconCart
//           number={numberImportCart}
//           onPress={() => navigation.navigate('ImportCart')}
//         />
//       </Appbar.Header>
//       <View style={{flex: 1}}>
//         <FlatList
//           data={listProduct}
//           columnWrapperStyle={{flexWrap: 'wrap'}}
//           numColumns={2}
//           showsVerticalScrollIndicator={false}
//           renderItem={({item}) => renderItem(item)}
//           keyExtractor={(item, index) => index.toString()}
//           contentContainerStyle={{
//             paddingVertical: 10,
//             paddingHorizontal: 8,
//             paddingBottom: Mixin.moderateSize(80),
//           }}
//         />
//       </View>
//       {itemProduct && (
//         <ModalChangeQuantity
//           ref={refModal}
//           addToCart={addToImportCard}
//           detailProduct={itemProduct}
//           isVisible={visibleModal}
//           onBackdropPress={() => setVisibleModal(false)}
//         />
//       )}
//       {numberImportCart > 0 && (
//         <Button
//           containerStyle={styles.btnGoCart}
//           title="Đi tới giỏ hàng"
//           onPress={goCart}
//         />
//       )}
//     </View>
//   );
// };

// export default ListImportProduct;

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

const ListImportProduct = ({navigation, route}) => {
  const animationIsRunning = useRef(false);

  const [listProduct, setListProduct] = useState([]);
  const [listChooseProduct, setListChooseProduct] = useState([]);

  const rowTranslateAnimatedValues = {};
  listChooseProduct.map(elm => {
    rowTranslateAnimatedValues[elm.id] = new Animated.Value(1);
  });

  useEffect(() => {
    const getListProduct = () => {
      get(`${Const.API.baseURL + Const.API.Product}?type=import`).then(res => {
        if (res.ok) {
          setListProduct(res.data.data);
        }
      });
    };
    getListProduct();
  }, []);

  const goPayment = () => {
    navigation.navigate('PaymentScreen', {
      type: 'import',
      dataProducts: listChooseProduct,
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
      newList.push({amount: 1, id: item.id, product: {...item}});
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
        <Appbar.BackAction color="white" onPress={() => navigation.goBack()} />
        <Appbar.Content
          style={{alignItems: 'center'}}
          color="white"
          title={'Nhập hàng'}
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
          title={trans('payment')}
          onPress={goPayment}
        />
      )}
    </View>
  );
};

export default ListImportProduct;
