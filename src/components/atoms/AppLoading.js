import React from 'react';
import {ActivityIndicator} from 'react-native';
import Modal from 'react-native-modal';
import {Colors, Mixin} from '../../styles';
import {statusBar} from '../../styles/Mixin';

// interface AppLoadingProps {
//   isVisible?: boolean;
// }
const AppLoading = props => {
  const {isVisible} = props;
  return (
    <Modal
      isVisible={isVisible}
      backdropOpacity={0.3}
      renderToHardwareTextureAndroid
      animationIn="fadeIn"
      hideModalContentWhileAnimating>
      <ActivityIndicator
        style={styles.indicator}
        // size="large"
        color={Colors.WHITE}
      />
    </Modal>
  );
};

const styles = {
  container: {
    // zIndex: 999999,
    // position: 'absolute',
    // top: 0,
    // left: 0,
    flex: 1,
    // backgroundColor: 'rgba(0,0,0,0.3)',
    height: Mixin.device_height + statusBar,
    width: Mixin.device_width,
    justifyContent: 'center',
  },
  indicator: {
    alignSelf: 'center',
  },
};

export default AppLoading;
