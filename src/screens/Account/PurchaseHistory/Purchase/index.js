import React from 'react';
import {FlatList, RefreshControl, View} from 'react-native';
import {container} from '../../../../styles/GlobalStyles';
import {Const, trans} from '../../../../utils';
import {useEffect} from 'react';
import {get} from '../../../../services/ServiceHandle';
import {useState} from 'react';

import {ItemOrder} from '../../../../components/molecules';
import {AppLoading} from '../../../../components/atoms';

const Purchase = ({navigation}) => {
  const [dataOrder, setDataOrder] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const getData = () => {
      setLoading(true);
      get(`${Const.API.baseURL + Const.API.Order}?type=retail`).then(res => {
        if (res.ok) {
          setLoading(false);
          setDataOrder(res.data.data);
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
    get(`${Const.API.baseURL + Const.API.Order}?type=retail`).then(res => {
      if (res.ok) {
        setRefresh(false);
        setDataOrder(res.data.data);
      } else {
        setRefresh(false);
        console.log(res.error);
      }
    });
  };

  const renderItem = ({item}) => {
    return <ItemOrder item={item} />;
  };

  return (
    <View style={container}>
      <AppLoading isVisible={loading} />
      <View style={{flex: 1}}>
        <FlatList
          data={dataOrder}
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

export default Purchase;
