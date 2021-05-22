import React from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import {images} from '../../assets';
import {AppImage, AppText} from '../../components/atoms';
import {container, viewRow, rowSpaceBetween} from '../../styles/GlobalStyles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './styles';
import {Colors} from '../../styles';
import FastImage from 'react-native-fast-image';
import {useSelector} from 'react-redux';
import IconCart from '../../components/molecules/IconCart';

const HomeScreen = ({navigation}) => {
  const userInfo = useSelector(state => state.AuthenOverallReducer.userAuthen);

  return (
    <View style={container}>
      {/* header */}
      <View style={styles.containerHeader}>
        <View style={[rowSpaceBetween]}>
          <View>
            <View style={viewRow}>
              <AppImage source={images.avatar} imageStyle={styles.avatar} />
              <View>
                <AppText style={styles.txtHello}>Xin chào,</AppText>
                <AppText title style={styles.txtName}>
                  {userInfo.fullname}
                </AppText>
              </View>
            </View>
          </View>
          <View style={{flexDirection: 'row'}}>
            <IconCart onPress={() => navigation.navigate('CartScreen')} />
            <TouchableOpacity
              // onPress={() => navigation.navigate('CartScreen')}
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
                50,000
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
              <View style={styles.viewProduct}>
                <IconMaterialCommunityIcons
                  name="badge-account-horizontal-outline"
                  size={40}
                  color={Colors.PRIMARY}
                />
              </View>
              <AppText style={styles.txtProduct}>Top Saler</AppText>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate('ListProduct')}>
              <View style={styles.viewProduct}>
                <IconMaterialCommunityIcons
                  name="download-multiple"
                  size={40}
                  color={Colors.PRIMARY}
                />
              </View>
              <AppText style={styles.txtProduct}>Sản Phẩm</AppText>
            </TouchableOpacity>
            <View>
              <View style={styles.viewProduct}>
                <IconMaterialCommunityIcons
                  name="gift-outline"
                  size={40}
                  color={Colors.PRIMARY}
                />
              </View>
              <AppText style={styles.txtProduct}>Ưu Đãi</AppText>
            </View>
          </View>
        </View>
      </View>

      <View style={{flex: 4, paddingHorizontal: 20, marginTop: 20}}>
        {/* Blog */}
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View
            style={{
              height: 100,
              width: 100,
              backgroundColor: '#CEDC8F',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Ionicons
              name="md-newspaper-outline"
              size={50}
              color={Colors.PRIMARY}
            />
            <AppText style={{color: Colors.PRIMARY, fontWeight: 'bold'}}>
              Blog
            </AppText>
          </View>
          <View
            style={{
              height: 100,
              width: 100,
              backgroundColor: '#CEDC8F',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Ionicons
              name="md-newspaper-outline"
              size={50}
              color={Colors.PRIMARY}
            />
            <AppText style={{color: Colors.PRIMARY, fontWeight: 'bold'}}>
              Blog
            </AppText>
          </View>
          <View
            style={{
              height: 100,
              width: 100,
              backgroundColor: '#CEDC8F',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Ionicons
              name="md-newspaper-outline"
              size={50}
              color={Colors.PRIMARY}
            />
            <AppText style={{color: Colors.PRIMARY, fontWeight: 'bold'}}>
              Blog
            </AppText>
          </View>
        </View>
        <FastImage
          source={images.test1}
          style={{width: '100%', height: 200, marginTop: 40}}
        />
      </View>
    </View>
  );
};
export default HomeScreen;
