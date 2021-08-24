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
import {AuthenOverallRedux, CartRedux, NotificationRedux} from '../../redux';
import {device_width} from '../../styles/Mixin';
import ItemCategory from './component/ItemCategory';
import ItemBlog from './component/ItemBlog';
import {Const} from '../../utils';
import LinearGradient from 'react-native-linear-gradient';
import {ItemProduct} from '../../components/molecules';
import {get} from '../../services/ServiceHandle';
import ItemPopular from './component/ItemPopular';
import AutoHeightImage from 'react-native-auto-height-image';

const HomeScreen = ({navigation}) => {
  const countNotiUnread = useSelector(
    state => state.NotificationReducer.countNotiUnread,
  );
  const numberPurchaseCart = useSelector(
    state => state.CartReducer.numberPurchaseCart,
  );
  const userInfo = useSelector(state => state.AuthenOverallReducer.userAuthen);

  const appConfig = useSelector(state => state.AppConfigReducer.appConfig);

  const dispatch = useDispatch();

  const [blogData, setBlogData] = useState([]);
  const [listProduct, setListProduct] = useState([]);

  const [categoryData, setCategoryData] = useState([]);

  useEffect(() => {
    dispatch(CartRedux.Actions.getPurchaseCart.request());
  }, [dispatch]);

  useEffect(() => {
    dispatch(NotificationRedux.Actions.getCountNotiUnread.request());
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
      get(`${Const.API.baseURL + Const.API.Product}?type=online`).then(res => {
        if (res.ok) {
          setListProduct(res.data.data.slice(0, 7));
        }
      });
    };
    getListProduct();
  }, []);

  const refreshPoint = () => {
    dispatch(AuthenOverallRedux.Actions.getProfile.request());
  };

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
    return (
      <ItemBlog
        onPress={() => navigation.navigate('DetailBlog', {item})}
        item={item}
      />
    );
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
                <AppText title style={styles.txtHello}>
                  {userInfo.affiliateCode}
                </AppText>
              </View>
            </View>
          </View>
          <View style={{flexDirection: 'row'}}>
            <IconCart
              icon="cart"
              number={numberPurchaseCart}
              onPress={() => navigation.navigate('CartScreen')}
            />
            <IconCart
              icon="notifications"
              number={countNotiUnread}
              onPress={() => navigation.navigate('NotificationScreen')}
            />
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
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{fontWeight: 'bold', marginRight: 8}}>
                <Text style={{color: Colors.ORANGE}}>
                  {numeral(userInfo.point).format()}
                </Text>{' '}
                điểm
              </Text>
              <TouchableOpacity onPress={refreshPoint}>
                <IconMaterialCommunityIcons
                  name="refresh"
                  size={28}
                  color={Colors.PRIMARY}
                />
              </TouchableOpacity>
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
          {/* <FastImage
            resizeMode="contain"
            source={{
              uri: Const.API.baseUrlImage + appConfig?.general?.homeBanners[0],
            }}
            style={styles.banner}
          /> */}
          <AutoHeightImage
            width={device_width}
            source={{
              uri: Const.API.baseUrlImage + appConfig?.general?.homeBanners[0],
            }}
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
