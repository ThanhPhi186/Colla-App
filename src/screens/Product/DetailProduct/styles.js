import {Colors, Mixin} from '../../../styles';

const styles = {
  viewInfo: {
    paddingHorizontal: Mixin.moderateSize(16),
    marginVertical: Mixin.moderateSize(12),
  },
  txtPrice: {
    color: Colors.GREEN_1,
    marginTop: Mixin.moderateSize(8),
  },
  largeIndicate: {
    width: '100%',
    height: 7,
    backgroundColor: Colors.LIGHT_GREY,
  },
  boxTitleProduct: {
    paddingHorizontal: Mixin.moderateSize(16),
    marginTop: Mixin.moderateSize(12),
    marginBottom: Mixin.moderateSize(12),
  },
  textInfo: {
    color: Colors.PRIMARY,
    fontWeight: '500',
    marginBottom: Mixin.moderateSize(8),
  },
};
export default styles;
