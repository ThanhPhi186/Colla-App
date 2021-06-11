import React, {forwardRef, useEffect, useState} from 'react';
import {FlatList, View, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import {Appbar, Searchbar} from 'react-native-paper';
import SimpleToast from 'react-native-simple-toast';
import {AppText} from '../../../components/atoms';
import {removeDiacritics} from '../../../helpers/collaHelper';
import {Colors} from '../../../styles';
import {AddressVN, trans} from '../../../utils';

const ChooseAddress = forwardRef((props, ref) => {
  const [visibleModal, setVisibleModal] = useState(false);
  const [type, setType] = useState('PROVINCE');
  const [dataAddress, setDataAddress] = useState([]);
  const [dataSearch, setDataSearch] = useState([]);
  const [address, setAddress] = useState({
    province: null,
    districts: null,
    wards: null,
  });

  useEffect(() => {
    ref.current = address;
  }, [address, ref]);

  useEffect(() => {
    if (type === 'PROVINCE') {
      setDataAddress(AddressVN);
      setDataSearch(AddressVN);
    }
    if (type === 'DISTRICT') {
      setDataAddress(address.province.districts);
      setDataSearch(address.province.districts);
    }
    if (type === 'WARDS') {
      setDataAddress(address.districts.wards);
      setDataSearch(address.province.wards);
    }
  }, [type, address]);

  const chooseAddress = item => {
    const convertData = {...address};
    if (type === 'PROVINCE') {
      convertData.province = item;
    }
    if (type === 'DISTRICT') {
      convertData.districts = item;
    }
    if (type === 'WARDS') {
      convertData.wards = item;
    }
    setAddress(convertData);
    closeModal();
  };

  const onChangeSearch = txt => {
    const searchData = dataSearch.filter(elm => {
      return removeDiacritics(elm.name).includes(removeDiacritics(txt));
    });
    setDataAddress(searchData);
  };

  const closeModal = () => {
    setVisibleModal(false);
  };

  const openModalProvince = () => {
    setVisibleModal(true);
    setType('PROVINCE');
  };

  const openModalDistrict = () => {
    if (!address.province) {
      return SimpleToast.show('Vui lòng chọn Tỉnh / Thành Phố');
    }
    setVisibleModal(true);
    setType('DISTRICT');
  };

  const openModalWards = () => {
    if (!address.province) {
      return SimpleToast.show('Vui lòng chọn Tỉnh / Thành Phố');
    }
    if (!address.districts) {
      return SimpleToast.show('Vui lòng chọn Quận / Huyện');
    }
    setVisibleModal(true);
    setType('WARDS');
  };

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={{
          height: 64,
          justifyContent: 'center',
          paddingLeft: 16,
          borderBottomWidth: 0.5,
          borderColor: Colors.GRAY,
        }}
        onPress={() => chooseAddress(item)}>
        <AppText>{item.name}</AppText>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <AppText style={{marginTop: 12}}>Tỉnh / Thành Phố</AppText>
      <TouchableOpacity style={styles.btnAddress} onPress={openModalProvince}>
        <AppText>{address.province?.name || 'Chọn Tỉnh / Thành Phố'}</AppText>
      </TouchableOpacity>

      <AppText style={{marginTop: 12}}>Quận / Huyện</AppText>
      <TouchableOpacity style={styles.btnAddress} onPress={openModalDistrict}>
        <AppText>{address.districts?.name || 'Chọn Quận / Huyện'}</AppText>
      </TouchableOpacity>

      <AppText style={{marginTop: 12}}>Xã / Phường</AppText>
      <TouchableOpacity style={styles.btnAddress} onPress={openModalWards}>
        <AppText>{address.wards?.name || 'Chọn Xã / Phường'}</AppText>
      </TouchableOpacity>
      <Modal
        isVisible={visibleModal}
        style={{
          backgroundColor: 'white',
          margin: 0,
          justifyContent: 'flex-start',
        }}>
        <Appbar.Header>
          <Appbar.BackAction color="white" onPress={closeModal} />
          <Appbar.Content color="white" title={trans('purchase')} />
        </Appbar.Header>
        <View style={styles.containerSearch}>
          <Searchbar
            placeholder={trans('search')}
            style={styles.searchBox}
            inputStyle={styles.input}
            onChangeText={txt => onChangeSearch(txt)}
          />
        </View>
        <FlatList
          data={dataAddress}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
        />
      </Modal>
    </View>
  );
});

const styles = {
  searchBox: {
    width: '90%',
    borderRadius: 12,
  },
  input: {
    fontStyle: 'italic',
  },
  containerSearch: {
    backgroundColor: Colors.PRIMARY,
    paddingVertical: 12,
    alignItems: 'center',
  },
  btnAddress: {
    height: 64,
    width: '100%',
    borderWidth: 0.5,
    borderColor: Colors.GRAY,
    justifyContent: 'center',
    paddingLeft: 8,
    marginTop: 8,
  },
};
export default ChooseAddress;
