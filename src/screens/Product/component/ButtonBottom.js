import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {AppText} from '../../../components/atoms';
import {device_height, device_width} from '../../../styles/Mixin';
import {trans} from '../../../utils';

const ButtonBottom = props => {
  const {goCart, goBuyNow} = props;
  return (
    <View style={styles.container}>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={['#00C4FF', '#00A6F0', '#0187E0']}
        style={styles.left}>
        <TouchableOpacity style={styles.button} onPress={goCart}>
          <AppText title style={styles.textButton}>
            {trans('addToCard')}
          </AppText>
        </TouchableOpacity>
      </LinearGradient>

      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={['#FF9900', '#F47D01', '#E65C03']}
        style={styles.right}>
        <TouchableOpacity style={styles.button} onPress={goBuyNow}>
          <AppText title style={styles.textButton}>
            {trans('buyNow')}
          </AppText>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
};

const styles = {
  container: {
    width: device_width,
    height: 48,
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
  },
  buttonLogin: {
    width: device_width - 60,
    height: device_height / 15,
    borderRadius: 30,
    // backgroundColor: R.colors.appColor,
    marginTop: 15,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
  },
  textButton: {
    fontWeight: '500',
    color: 'white',
  },
  left: {
    flex: 0.9,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {flex: 1, alignItems: 'center', justifyContent: 'center'},

  right: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
};

export default ButtonBottom;
