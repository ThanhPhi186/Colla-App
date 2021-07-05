import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Colors} from '../../styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  HEIGHT_MIDDLE_HOME_BTN,
  NAVIGATION_BOTTOM_TABS_HEIGHT,
} from '../../styles/GlobalStyles';
import {isIphoneX} from '../../helpers/iphoneXHelper';

const CustomButtonTab = (props, children) => {
  const {onPress} = props;

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={1}
      onPress={onPress}>
      <View style={styles.circleInside}>
        <Ionicons name="logo-usd" size={44} color={Colors.WHITE} />
      </View>
    </TouchableOpacity>
  );
};
const styles = {
  container: {
    top: isIphoneX()
      ? -(NAVIGATION_BOTTOM_TABS_HEIGHT / 2 + 5)
      : -(NAVIGATION_BOTTOM_TABS_HEIGHT / 2 + 25),
  },

  circleInside: {
    width: HEIGHT_MIDDLE_HOME_BTN,
    height: HEIGHT_MIDDLE_HOME_BTN,
    borderRadius: HEIGHT_MIDDLE_HOME_BTN / 2,
    backgroundColor: Colors.PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
  },
};
export default CustomButtonTab;
