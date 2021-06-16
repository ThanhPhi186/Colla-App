import React from 'react';
import {Platform, TouchableOpacity, View} from 'react-native';
import {Colors} from '../../styles';
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const CustomButtonTab = (props, children) => {
  const {onPress, tabBarVisible} = props;
  console.log('tabBarVisible', tabBarVisible);

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {top: Platform.OS === 'android' && !tabBarVisible ? 70 : -20},
      ]}
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
