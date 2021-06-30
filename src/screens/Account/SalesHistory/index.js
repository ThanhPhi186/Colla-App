// import React from 'react';
// import {FlatList, View} from 'react-native';
// import {Appbar} from 'react-native-paper';
// import {AppLoading} from '../../../components/atoms';

// import {container} from '../../../styles/GlobalStyles';
// import {Const, trans} from '../../../utils';

// import {useEffect} from 'react';
// import {get, put} from '../../../services/ServiceHandle';
// import {useState} from 'react';

// import SimpleToast from 'react-native-simple-toast';
// import {ItemOrder} from '../../../components/molecules';
// import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

// const ImportHistory = ({navigation, route}) => {
//   const Tab = createMaterialTopTabNavigator();
//   const {type} = route.params;

//   const API_ORDER =
//     type === 'SALES_ONLINE' ? Const.API.OnlineOrder : Const.API.Order;

//   const [dataOrder, setDataOrder] = useState([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     getData();
//   }, [type]);

//   const getData = () => {
//     setLoading(true);
//     get(Const.API.baseURL + API_ORDER).then(res => {
//       if (res.ok) {
//         setLoading(false);
//         setDataOrder(res.data.data);
//       } else {
//         setLoading(false);
//         console.log(res.error);
//       }
//     });
//   };

//   const changeStatus = (item, status) => {
//     put(`${Const.API.baseURL + API_ORDER}/${item.id}`, {status}).then(res => {
//       if (res.ok) {
//         getData();
//       } else {
//         SimpleToast.show(res.error, SimpleToast.SHORT);
//       }
//     });
//   };

//   const renderItem = ({item}) => {
//     return (
//       <ItemOrder
//         item={item}
//         confirmOrder={() => changeStatus(item, 'finish')}
//         cancelOrder={() => changeStatus(item, 'cancel')}
//       />
//     );
//   };

//   const renderOnline = () => {
//     return (
//       <View style={{flex: 1}}>
//         <FlatList
//           data={dataOrder}
//           renderItem={renderItem}
//           keyExtractor={(item, index) => index.toString()}
//           contentContainerStyle={{paddingBottom: 16}}
//           showsVerticalScrollIndicator={false}
//         />
//       </View>
//     );
//   };

//   const renderOffline = () => {
//     return (
//       <View style={{flex: 1}}>
//         <FlatList
//           data={dataOrder}
//           renderItem={renderItem}
//           keyExtractor={(item, index) => index.toString()}
//           contentContainerStyle={{paddingBottom: 16}}
//           showsVerticalScrollIndicator={false}
//         />
//       </View>
//     );
//   };

//   return (
//     <View style={container}>
//       <Appbar.Header>
//         <Appbar.BackAction color="white" onPress={() => navigation.goBack()} />
//         <Appbar.Content color="white" title={trans('salesHistory')} />
//       </Appbar.Header>
//       <AppLoading isVisible={loading} />
//       <Tab.Navigator>
//         <Tab.Screen name="ONLINE" component={renderOnline} />
//         <Tab.Screen name="OFFLINE" component={renderOffline} />
//       </Tab.Navigator>
//     </View>
//   );
// };

// export default ImportHistory;

import React from 'react';
import {FlatList, View} from 'react-native';
import {Appbar} from 'react-native-paper';
import {AppLoading} from '../../../components/atoms';

import {container} from '../../../styles/GlobalStyles';
import {Const, trans} from '../../../utils';

import {useEffect} from 'react';
import {get, put} from '../../../services/ServiceHandle';
import {useState} from 'react';

import SimpleToast from 'react-native-simple-toast';
import {ItemOrder} from '../../../components/molecules';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ImportHistory = ({navigation}) => {
  const Tab = createMaterialTopTabNavigator();

  // Const.API.Order;
  const [apiOrder, setApiOrder] = useState(Const.API.OnlineOrder);
  const [dataOrder, setDataOrder] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getData();
  }, [apiOrder]);

  const getData = () => {
    setLoading(true);
    get(Const.API.baseURL + apiOrder).then(res => {
      if (res.ok) {
        setLoading(false);
        setDataOrder(res.data.data);
      } else {
        setLoading(false);
        console.log(res.error);
      }
    });
  };

  const changeStatus = (item, status) => {
    put(`${Const.API.baseURL + apiOrder}/${item.id}`, {status}).then(res => {
      if (res.ok) {
        getData();
      } else {
        SimpleToast.show(res.error, SimpleToast.SHORT);
      }
    });
  };

  const renderItem = ({item}) => {
    return (
      <ItemOrder
        item={item}
        confirmOrder={() => changeStatus(item, 'finish')}
        cancelOrder={() => changeStatus(item, 'cancel')}
      />
    );
  };

  const renderOnline = () => {
    return (
      <View style={{flex: 1}}>
        <FlatList
          data={dataOrder}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{paddingBottom: 16}}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  };

  return (
    <View style={container}>
      <Appbar.Header>
        <Appbar.BackAction color="white" onPress={() => navigation.goBack()} />
        <Appbar.Content color="white" title={trans('salesHistory')} />
      </Appbar.Header>
      <AppLoading isVisible={loading} />
      <Tab.Navigator>
        <Tab.Screen
          name="ONLINE"
          component={renderOnline}
          listeners={() => ({
            tabPress: () => {
              setApiOrder(Const.API.OnlineOrder);
            },
          })}
        />
        <Tab.Screen
          name="OFFLINE"
          component={renderOnline}
          listeners={() => ({
            tabPress: () => {
              setApiOrder(Const.API.Order);
            },
          })}
        />
      </Tab.Navigator>
    </View>
  );
};

export default ImportHistory;
