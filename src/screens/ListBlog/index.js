import React, {useEffect, useState} from 'react';
import {FlatList, RefreshControl, View} from 'react-native';
import {Appbar} from 'react-native-paper';
import SimpleToast from 'react-native-simple-toast';
import {AppLoading, AppText} from '../../components/atoms';
import {get} from '../../services/ServiceHandle';
import {container} from '../../styles/GlobalStyles';
import {Const, trans} from '../../utils';
import ItemBlog from '../HomeScreen/component/ItemBlog';
import styles from './styles';

const ListBlog = ({navigation, route}) => {
  const [listBlog, setListBlog] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const {categoryId} = route.params;

  useEffect(() => {
    setLoading(true);
    const getBlog = () => {
      const params = {
        category: categoryId,
      };
      get(Const.API.baseURL + Const.API.Blog, params).then(res => {
        if (res.ok) {
          setListBlog(res.data.data);
          setLoading(false);
        } else {
          setLoading(false);
          setTimeout(() => {
            SimpleToast.show(res.error, SimpleToast.SHORT);
          }, 700);
        }
      });
    };
    getBlog();
  }, [categoryId]);

  const onRefresh = () => {
    setRefresh(true);
    const params = {
      category: categoryId,
    };
    get(Const.API.baseURL + Const.API.Blog, params).then(res => {
      if (res.ok) {
        setListBlog(res.data.data);
        setRefresh(false);
      } else {
        setRefresh(false);
        setTimeout(() => {
          SimpleToast.show(res.error, SimpleToast.SHORT);
        }, 700);
      }
    });
  };

  const renderEmptyComponent = () => {
    return <AppText style={styles.txtEmpty}>{trans('emptyBlog')}</AppText>;
  };

  const renderBlog = ({item}) => {
    return <ItemBlog
      onPress={() => navigation.navigate('DetailBlog', {item})}
      item={item}
    />;
  };

  return (
    <View style={container}>
      <AppLoading isVisible={loading} />
      <Appbar.Header>
        <Appbar.BackAction color="white" onPress={() => navigation.goBack()} />
        <Appbar.Content color="white" title={trans('listBlog')} />
      </Appbar.Header>
      <View style={{flex: 1}}>
        <FlatList
          data={listBlog}
          renderItem={renderBlog}
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={renderEmptyComponent}
          refreshControl={
            <RefreshControl refreshing={refresh} onRefresh={onRefresh} />
          }
          contentContainerStyle={{
            paddingHorizontal: 4,
            paddingBottom: 4,
          }}
        />
      </View>
    </View>
  );
};

export default ListBlog;
