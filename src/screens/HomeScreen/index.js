import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  FlatList,
} from 'react-native';

import {images} from '../../assets';
import {AppImage, AppText} from '../../components/atoms';
import {
  container,
  viewRow,
  rowSpaceBetween,
  NAVIGATION_BOTTOM_TABS_HEIGHT,
  HEIGHT_MIDDLE_HOME_BTN,
} from '../../styles/GlobalStyles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './styles';
import {Colors} from '../../styles';
import FastImage from 'react-native-fast-image';
import {useDispatch, useSelector} from 'react-redux';
import IconCart from '../../components/molecules/IconCart';
import numeral from 'numeral';
import {CartRedux} from '../../redux';
import {device_width} from '../../styles/Mixin';
import ItemCategory from './component/ItemCategory';
import ItemBlog from './component/ItemBlog';
import {Const} from '../../utils';
import LinearGradient from 'react-native-linear-gradient';
import {ItemProduct} from '../../components/molecules';
import {get} from '../../services/ServiceHandle';
import ItemPopular from './component/ItemPopular';

const HomeScreen = ({navigation}) => {
  const numberPurchaseCart = useSelector(
    state => state.CartReducer.numberPurchaseCart,
  );
  const userInfo = useSelector(state => state.AuthenOverallReducer.userAuthen);
  const dispatch = useDispatch();

  const [blogData, setBlogData] = useState([]);
  const [listProduct, setListProduct] = useState([]);

  const [categoryData, setCategoryData] = useState([]);

  console.log('Math.ceil', Math.ceil(5 / 2));

  useEffect(() => {
    dispatch(CartRedux.Actions.getPurchaseCart.request());
  }, [dispatch]);

  useEffect(() => {
    const getBlog = () => {
      get(Const.API.baseURL + Const.API.Blog).then(res => {
        if (res.ok) {
          setBlogData(res.data.data);
        }
      });
    };
    getBlog();
  }, []);

  useEffect(() => {
    const getCategoryBlog = () => {
      get(Const.API.baseURL + Const.API.BlogCategory).then(res => {
        if (res.ok) {
          setCategoryData(res.data.data);
        }
      });
    };
    getCategoryBlog();
  }, []);

  useEffect(() => {
    const getListProduct = () => {
      get(`${Const.API.baseURL + Const.API.Product}?type=retail`).then(res => {
        if (res.ok) {
          setListProduct(res.data.data.slice(0, 7));
        }
      });
    };
    getListProduct();
  }, []);

  const renderCategory = ({item}) => {
    return (
      <View style={{width: device_width / 3.5, alignItems: 'center'}}>
        <ItemCategory
          onPress={() => navigation.navigate('ListBlog', {categoryId: item.id})}
          item={item}
        />
      </View>
    );
  };

  const renderBlog = ({item}) => {
    return <ItemBlog item={item} />;
  };

  const renderProductPopular = ({item}) => {
    return (
      <ItemPopular
        item={item}
        onPress={() => navigation.navigate('DetailProduct', {item})}
        // addToCart={() => addToCart(item)}
      />
    );
  };

  return (
    <View style={container}>
      {/* header */}
      <View style={styles.containerHeader}>
        <View style={[rowSpaceBetween]}>
          <View>
            <View style={viewRow}>
              <AppImage
                source={
                  userInfo.avatar
                    ? {uri: Const.API.baseUrlImage + userInfo.avatar}
                    : images.avatar
                }
                imageStyle={styles.avatar}
              />
              <View>
                <AppText style={styles.txtHello}>Xin chào,</AppText>
                <AppText title style={styles.txtName}>
                  {userInfo.fullname}
                </AppText>
              </View>
            </View>
          </View>
          <View style={{flexDirection: 'row'}}>
            <IconCart
              number={numberPurchaseCart}
              onPress={() => navigation.navigate('CartScreen')}
            />
            <TouchableOpacity
              onPress={() => navigation.navigate('NotificationScreen')}
              style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View style={{padding: 4}}>
                <Ionicons name="notifications" size={32} color={Colors.WHITE} />
                <View
                  style={{
                    position: 'absolute',
                    top: 6,
                    right: 4,
                    width: 16,
                    aspectRatio: 1 / 1,
                    backgroundColor: 'red',
                    borderRadius: 50,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{fontSize: 12, color: 'white', fontWeight: '600'}}>
                    8
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Card */}

      <View
        style={{
          backgroundColor: '#FFF',
          marginHorizontal: 20,
          borderRadius: 10,
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: '-7%',
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 4,
          },
          shadowOpacity: 0.3,
          shadowRadius: 4.65,
          elevation: 8,
        }}>
        <View style={{flex: 1}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingVertical: 8,
              borderBottomWidth: 1,
              paddingHorizontal: 20,
              borderColor: Colors.PRIMARY,
            }}>
            <AppImage
              source={images.logoTransparent}
              imageStyle={{width: 80, height: 40}}
            />
            <View style={{flexDirection: 'row'}}>
              <AppText style={{color: Colors.ORANGE, fontWeight: 'bold'}}>
                {numeral(userInfo.point).format()}
              </AppText>
              <AppText style={{fontWeight: 'bold'}}> điểm</AppText>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginVertical: 12,
            }}>
            <View>
              <TouchableOpacity
                onPress={() => navigation.navigate('TopSales')}
                style={styles.viewProduct}>
                <IconMaterialCommunityIcons
                  name="badge-account-horizontal-outline"
                  size={40}
                  color={Colors.PRIMARY}
                />
              </TouchableOpacity>
              <AppText style={styles.txtProduct}>Top Saler</AppText>
            </View>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('ListProduct', {type: 'ORDER'})
              }>
              <View style={styles.viewProduct}>
                <IconMaterialCommunityIcons
                  name="download-multiple"
                  size={40}
                  color={Colors.PRIMARY}
                />
              </View>
              <AppText style={styles.txtProduct}>Sản Phẩm</AppText>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('PromotionScreen')}>
              <View style={styles.viewProduct}>
                <IconMaterialCommunityIcons
                  name="gift-outline"
                  size={40}
                  color={Colors.PRIMARY}
                />
              </View>
              <AppText style={styles.txtProduct}>Ưu Đãi</AppText>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={{flex: 4, paddingHorizontal: 20, marginTop: 20}}>
        {/* Category */}

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom:
              NAVIGATION_BOTTOM_TABS_HEIGHT + HEIGHT_MIDDLE_HOME_BTN,
          }}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <FlatList
              data={categoryData}
              renderItem={renderCategory}
              keyExtractor={(item, index) => index.toString()}
              // numColumns={Math.ceil(categoryData.length / 2)}
              numColumns={3}
              scrollEnabled={false}
            />
          </ScrollView>
          <FastImage
            resizeMode="stretch"
            source={images.demoBanner}
            style={styles.banner}
          />
          <AppText
            containerStyle={{marginTop: 8}}
            style={{color: Colors.PRIMARY}}
            title>
            Sản phẩm phân phối
          </AppText>
          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal
            data={listProduct}
            renderItem={renderProductPopular}
            contentContainerStyle={{paddingHorizontal: 4}}
            keyExtractor={(item, index) => index.toString()}
          />

          <AppText style={{color: Colors.PRIMARY}} title>
            Tin tức
          </AppText>
          <FlatList
            nestedScrollEnabled
            showsVerticalScrollIndicator={false}
            data={blogData}
            renderItem={renderBlog}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={{
              paddingHorizontal: 4,
              paddingBottom: 4,
            }}
          />
        </ScrollView>
      </View>
    </View>
  );
};
export default HomeScreen;
