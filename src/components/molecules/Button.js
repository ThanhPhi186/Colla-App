import React from 'react';
import {TouchableOpacity} from 'react-native';
import {ViewContainer, AppText} from '../atoms';
import {Mixin, Colors} from '../../styles';

const Button = props => {
  const {containerStyle, titleColor, title} = props;
  return (
    <TouchableOpacity {...props} style={[styles.container, containerStyle]}>
      <AppText
        title
        style={[styles.title, {color: titleColor || Colors.WHITE}]}>
        {title}
      </AppText>
    </TouchableOpacity>
  );
};

const styles = {
  container: {
    height: Mixin.moderateSize(50),
    borderRadius: Mixin.moderateSize(12),
    backgroundColor: Colors.PRIMARY,
    justifyContent: 'center',
    paddingHorizontal: Mixin.moderateSize(12),
    marginBottom: Mixin.moderateSize(8),
    width: '90%',
  },
  title: {
    fontWeight: '600',
    textAlign: 'center',
  },
};
export default Button;
