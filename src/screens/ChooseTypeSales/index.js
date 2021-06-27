import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import Modal from 'react-native-modal';
import {useDispatch, useSelector} from 'react-redux';
import {AppText} from '../../components/atoms';
import {CartRedux} from '../../redux';
import {container} from '../../styles/GlobalStyles';
import {trans} from '../../utils';
import styles from './styles';

const ChooseTypeSales = props => {
  const dispatch = useDispatch();

  const isVisibleModal = useSelector(
    state => state.CartReducer.isVisibleModalTypeSales,
  );

  return (
    <Modal isVisible={isVisibleModal} {...props}>
      <View style={styles.modal}>
        <AppText style={styles.title}>{trans('noti')}</AppText>
        <AppText>AAA</AppText>
      </View>
      <TouchableOpacity
        onPress={() => dispatch(CartRedux.Actions.handelModalTypeSales(false))}>
        <AppText>OFF</AppText>
      </TouchableOpacity>
    </Modal>
  );
};

export default ChooseTypeSales;
