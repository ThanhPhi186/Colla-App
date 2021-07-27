import React, {useEffect, useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import Modal from 'react-native-modal';

import moment from 'moment';
import {AppText} from '../../../../components/atoms';
import {Button} from '../../../../components/molecules';
import {Colors, Mixin} from '../../../../styles';

const PeriodModal = props => {
  const {onPress} = props;
  const [modalTime, setModalTime] = useState(false);
  const [periodTitle, setPeriodTitle] = useState('Ngày');

  return (
    <>
      <TouchableOpacity
        style={styles.btnPeriod}
        onPress={() => setModalTime(true)}>
        <AppText style={{color: '#00CCA4'}}>{periodTitle}</AppText>
      </TouchableOpacity>
      <Modal isVisible={modalTime} onBackdropPress={() => setModalTime(false)}>
        <View style={styles.containerModal}>
          <Button
            containerStyle={styles.btnTime}
            title="Ngày"
            onPress={() => {
              onPress({date: moment().startOf('month').format(), type: 'date'});
              setPeriodTitle('Ngày');
              setModalTime(false);
            }}
          />
          {/* <Button
            containerStyle={styles.btnTime}
            title="Tuần"
            onPress={() => {
              onPress(moment().subtract(7, 'days').format('YYYY-MM-DD'));
              setPeriodTitle('Tuần');
              setModalTime(false);
            }}
          /> */}
          <Button
            containerStyle={styles.btnTime}
            title="Tháng"
            onPress={() => {
              onPress({date: moment().startOf('year').format(), type: 'month'});

              setPeriodTitle('Tháng');
              setModalTime(false);
            }}
          />
          <Button
            containerStyle={styles.btnTime}
            title="Năm"
            onPress={() => {
              onPress({date: moment().startOf('year').format(), type: 'year'});
              setPeriodTitle('Năm');
              setModalTime(false);
            }}
          />
        </View>
      </Modal>
    </>
  );
};
export default PeriodModal;

const styles = {
  btnPeriod: {
    backgroundColor: '#DEFFF6',
    height: 40,
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
  containerModal: {
    alignSelf: 'center',
    width: Mixin.device_width * 0.7,
    backgroundColor: Colors.WHITE,
    borderRadius: Mixin.moderateSize(8),
    ...Mixin.padding(16, 16, 8, 16),
  },
  btnTime: {
    borderWidth: 1,
    borderColor: Colors.PRIMARY,
    alignSelf: 'center',
  },
};
