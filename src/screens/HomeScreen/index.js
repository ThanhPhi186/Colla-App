import React, {useEffect} from 'react';
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
import {container, viewRow, rowSpaceBetween} from '../../styles/GlobalStyles';
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
import {Const} from '../../utils';

const HomeScreen = ({navigation}) => {
  const numberProductCart = useSelector(
    state => state.CartReducer.numberProductCart,
  );
  const userInfo = useSelector(state => state.AuthenOverallReducer.userAuthen);
  const dispatch = useDispatch();

  const categoryData = [
    {
      name: 'Mẹ và bé',
      img: 'https://yt.cdnxbvn.com/medias/uploads/205/205537-binh-sua-tommee-tippee-500x340.jpg',
    },
    {
      name: 'Công nghệ',
      img: 'https://www.zonegroup.vn/wp-content/uploads/2019/03/option5-300x300.jpg',
    },
    {
      name: 'Sức khoẻ',
      img: 'https://printgo.vn/uploads/media/772948/4-nguyen-tac-trong-thiet-ke-logo-nganh-y-duoc1_1585664899.jpg',
    },
    {
      name: 'Làm đẹp',
      img: 'https://yt.cdnxbvn.com/medias/uploads/188/188616-da-hon-hop.jpg',
    },
    {
      name: 'Đồ gia dụng',
      img: 'https://static2.yan.vn/YanNews/201909/201909270932104845-05e95836-8fd5-4a78-899f-d311c9754d3b.png',
    },
    {
      name: 'Thời trang nam',
      img: 'https://ann.com.vn/wp-content/uploads/shop-quan-ao-nam.jpg',
    },
  ];

  useEffect(() => {
    dispatch(CartRedux.Actions.getCart.request());
  }, [dispatch]);

  const renderCategory = ({item}) => {
    return (
      <View style={{width: device_width / 3.5, alignItems: 'center'}}>
        <ItemCategory item={item} />
      </View>
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
                    ? {uri: Const.API.baseURL + userInfo.avatar}
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
              number={numberProductCart}
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
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <FlatList
            data={categoryData}
            renderItem={renderCategory}
            keyExtractor={(item, index) => index.toString()}
            numColumns={Math.ceil(categoryData.length / 2)}
            scrollEnabled={false}
          />
        </ScrollView>

        {/* <FastImage source={images.test1} style={{width: '100%', height: 200}} /> */}
      </View>
    </View>
  );
};
export default HomeScreen;
