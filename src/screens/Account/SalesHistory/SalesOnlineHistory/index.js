import React from 'react';
import {FlatList, RefreshControl, View} from 'react-native';
import {Appbar} from 'react-native-paper';
import {AppLoading} from '../../../../components/atoms';

import {container} from '../../../../styles/GlobalStyles';
import {Const, trans} from '../../../../utils';
import {useEffect} from 'react';
import {get, put} from '../../../../services/ServiceHandle';
import {useState} from 'react';
import SimpleToast from 'react-native-simple-toast';
import {ItemOrder} from '../../../../components/molecules';

const SalesOnlineHistory = ({navigation}) => {
  const [dataOrder, setDataOrder] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const getData = () => {
      setLoading(true);
      get(Const.API.baseURL + Const.API.OnlineOrder).then(res => {
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
    get(Const.API.baseURL + Const.API.OnlineOrder).then(res => {
      if (res.ok) {
        setRefresh(false);
        setDataOrder(res.data.data);
      } else {
        setRefresh(false);
        console.log(res.error);
      }
    });
  };

  const changeStatus = (item, status) => {
    put(`${Const.API.baseURL + Const.API.OnlineOrder}/${item.id}`, {
      status,
    }).then(res => {
      if (res.ok) {
        onRefresh();
      } else {
        SimpleToast.show(res.error, SimpleToast.SHORT);
      }
    });
  };

  const renderItem = ({item}) => {
    return (
      <ItemOrder
        type="SALES_ONLINE"
        item={item}
        // confirmOrder={() => changeStatus(item, 'finish')}
        cancelOrder={() => changeStatus(item, 'cancel')}
      />
    );
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

export default SalesOnlineHistory;
