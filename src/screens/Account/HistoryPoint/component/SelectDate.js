import React, {useState} from 'react';
import {View, TextInput, Text, TouchableOpacity} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {AppText} from '../../../../components/atoms';
import {Colors, Mixin} from '../../../../styles';
import {device_width} from '../../../../styles/Mixin';
import {FONT_SIZE_14} from '../../../../styles/Typography';

// interface SelectDateProps {
//   title?: string;
//   isRequired?: Boolean;
//   type: string;
//   valueSelect: string;
//   onPress: () => void;
//   setValueDate: (date) => void;
// }

const SelectDate = props => {
  const {setValueDate, valueDate} = props;
  const [modalDatePicker, setModalDatePicker] = useState(false);

  return (
    <TouchableOpacity
      onPress={() => setModalDatePicker(true)}
      style={styles.container}>
      <AppText style={styles.txtSelect}>{valueDate}</AppText>
      <DateTimePickerModal
        isVisible={modalDatePicker}
        mode="date"
        onConfirm={date => {
          setValueDate(date);
          setModalDatePicker(false);
        }}
        onCancel={() => setModalDatePicker(false)}
      />
    </TouchableOpacity>
  );
};
export default SelectDate;

const styles = {
  container: {
    borderWidth: 1,
    borderColor: Colors.LIGHT_GREY,
    borderRadius: 16,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },

  txtSelect: {
    fontStyle: 'italic',
  },
};
