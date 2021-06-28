import React, {useState} from 'react';
import {View, TextInput, Text, TouchableOpacity} from 'react-native';
import {Colors, Mixin} from '../../styles';
import {
  FONT_SIZE_14,
  FONT_SIZE_16,
  FONT_SIZE_20,
} from '../../styles/Typography';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AppText from './AppText';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import DateTimePickerModal from 'react-native-modal-datetime-picker';

// interface FormInputProps {
//   title?: string;
//   isRequired?: Boolean;
//   type: string;
//   valueSelect: string;
//   onPress: () => void;
//   setValueDate: (date) => void;
// }

const FormInput = props => {
  const {title, isRequired, type, containerStyle, setValueDate, valueDate} =
    props;
  const [modalDatePicker, setModalDatePicker] = useState(false);

  const renderContent = () => {
    switch (type) {
      case 'selectDate':
        return (
          <TouchableOpacity
            onPress={() => setModalDatePicker(true)}
            style={styles.btnSelect}>
            <AppText style={styles.txtSelect}>{valueDate}</AppText>
          </TouchableOpacity>
        );
      default:
        return <TextInput {...props} style={styles.txtInput} />;
    }
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.content}>
        <AppText style={styles.title}>{title}</AppText>
        {isRequired && <AppText style={styles.required}> (*)</AppText>}
      </View>
      {renderContent()}
      <DateTimePickerModal
        isVisible={modalDatePicker}
        mode="date"
        onConfirm={date => {
          setValueDate(date);
          setModalDatePicker(false);
        }}
        onCancel={() => setModalDatePicker(false)}
      />
    </View>
  );
};
export default FormInput;

const styles = {
  container: {
    marginTop: Mixin.moderateSize(24),
  },
  content: {
    flexDirection: 'row',
  },
  viewInput: {
    borderWidth: 1,
    borderColor: 'gray',
    marginTop: 8,
    height: Mixin.moderateSize(40),
    borderRadius: Mixin.moderateSize(4),
    paddingHorizontal: Mixin.moderateSize(8),
    justifyContent: 'center',
  },
  txtInput: {
    borderBottomWidth: 1,
    borderColor: Colors.LIGHT_GREY,
    // marginTop: 8,
    height: Mixin.moderateSize(40),
    // borderRadius: Mixin.moderateSize(4),
    paddingHorizontal: Mixin.moderateSize(8),
    fontSize: FONT_SIZE_14,
  },
  title: {
    fontSize: FONT_SIZE_14,
    color: Colors.BLACK,
  },
  required: {
    fontSize: FONT_SIZE_14,
    color: Colors.RED,
  },
  btnSelect: {
    borderBottomWidth: 1,
    borderColor: Colors.LIGHT_GREY,
    marginTop: 8,
    height: Mixin.moderateSize(40),
    borderRadius: Mixin.moderateSize(4),
    paddingHorizontal: 8,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  txtSelect: {
    fontSize: FONT_SIZE_14,
  },
};
