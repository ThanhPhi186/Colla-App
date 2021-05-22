import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Colors} from '../../styles';
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const CustomButtonTab = (props, children) => {
  const {onPress} = props;
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={1}
      onPress={onPress}>
      {/* <View style={styles.circleCover}> */}
      <View style={styles.circleInside}>
        <IconMaterialCommunityIcons
          name="qrcode-scan"
          size={40}
          color={Colors.WHITE}
        />
      </View>
      {/* </View> */}
    </TouchableOpacity>
  );
};
const styles = {
  container: {
    top: -20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleCover: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleInside: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: Colors.PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
  },
};
export default CustomButtonTab;
