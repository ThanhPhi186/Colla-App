import React, {useEffect, useState} from 'react';
import {FlatList, Keyboard, Platform, View} from 'react-native';
import {Searchbar} from 'react-native-paper';
import {removeDiacritics} from '../../helpers/collaHelper';
import {Colors, Mixin} from '../../styles';
import {trans} from '../../utils';
import CardItem from './CardItem';

const SearchProduct = props => {
  const {data, selectProduct} = props;
  const [isVisible, setIsVisible] = useState(false);
  const [dataProduct, setDataProduct] = useState(data);

  useEffect(() => {
    setDataProduct(data);
  }, [data]);

  const onChangeSearch = txt => {
    const searchData = data.filter(elm => {
      return removeDiacritics(elm.name).includes(removeDiacritics(txt));
    });
    setDataProduct(searchData);
  };

  const renderItem = item => {
    return (
      <CardItem
        item={item}
        onPress={() => {
          selectProduct(item);
          setIsVisible(false);
          Keyboard.dismiss();
        }}
      />
    );
  };

  return (
    <View style={Platform.OS === 'ios' && styles.containerIos}>
      <View style={styles.container}>
        <Searchbar
          {...props}
          placeholder={trans('chooseProduct')}
          style={styles.containerSearch}
          inputStyle={styles.input}
          onChangeText={onChangeSearch}
          onFocus={() => setIsVisible(true)}
          onBlur={() => setIsVisible(false)}
        />
      </View>
      {isVisible && (
        <View style={styles.containerListSearch}>
          <FlatList
            data={dataProduct}
            renderItem={({item}) => renderItem(item)}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          />
        </View>
      )}
    </View>
  );
};
export default SearchProduct;

const styles = {
  container: {
    backgroundColor: Colors.PRIMARY,
    paddingVertical: 12,
    alignItems: 'center',
  },
  containerSearch: {
    width: '90%',
    borderRadius: 12,
  },
  containerListSearch: {
    alignSelf: 'center',
    position: 'absolute',
    width: '90%',
    backgroundColor: Colors.WHITE,
    top: 60,
    paddingHorizontal: 12,
    paddingTop: 12,
    height: Mixin.device_height / 2,
    zIndex: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  input: {
    fontStyle: 'italic',
  },
  containerIos: {
    zIndex: 1,
  },
};
