import React from 'react';
import {FlatList, Text, RefreshControl, View} from 'react-native';
import {Appbar} from 'react-native-paper';
import {AppText} from '../../../components/atoms';
import {Colors} from '../../../styles';
import {container} from '../../../styles/GlobalStyles';
import {trans} from '../../../utils';
import numeral from 'numeral';

import {AppLoading} from '../../../components/atoms';
import {Const} from '../../../utils';
import {useEffect} from 'react';
import {get, put} from '../../../services/ServiceHandle';
import {useState} from 'react';

const ListCustomer = ({navigation}) => {
  const [dataCustomer, setDataCustomer] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const getData = () => {
      setLoading(true);
      get(`${Const.API.baseURL + Const.API.UserCustomer}`).then(res => {
        if (res.ok) {
          setLoading(false);
          setDataCustomer(res.data.data);
        } else {
          setLoading(false);
          console.log(res.error);
        }
      });
    };
    getData();
  }, []);

  const onRefresh = () => {
    setRefresh(true);
    get(`${Const.API.baseURL + Const.API.UserCustomer}`).then(res => {
      if (res.ok) {
        setRefresh(false);
        setDataCustomer(res.data.data);
      } else {
        setRefresh(false);
        console.log(res.error);
      }
    });
  };

  const renderItem = ({item}) => {
    return (
      <View
        style={{
          alignSelf: 'center',
          width: '90%',
          backgroundColor: Colors.WHITE,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
          marginTop: 16,
          padding: 20,
          borderRadius: 12,
        }}>
        <AppText>
          {item.fullname} - {item.phone}
        </AppText>
        <AppText style={{marginTop: 16}}>Cấp bậc : {item.customer && (
          item.customer.member_type == 'member' ? 'Khách hàng' : (
            item.customer.member_type == 'collaborator' ? 'Cộng tác viên' : (
              item.customer.member_type == 'agency' ? 'Đại lý' : (
                item.customer.member_type == 'gold-agency' ? 'Đại lý Gold' : (
                  item.customer.member_type == 'unverified' ? 'Chưa xác thực' : ''
                )
              )
            )
          )
        )}</AppText>
      </View>
    );
  };

  return (
    <View style={container}>
      <Appbar.Header>
        <Appbar.BackAction color="white" onPress={() => navigation.goBack()} />
        <Appbar.Content color="white" title={trans('listCustomer')} />
      </Appbar.Header>
      <AppLoading isVisible={loading} />
      <View style={{flex: 1}}>
        <FlatList
          data={dataCustomer}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{paddingBottom: 16}}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refresh} onRefresh={onRefresh} />
          }
        />
      </View>
    </View>
  );
};

export default ListCustomer;
