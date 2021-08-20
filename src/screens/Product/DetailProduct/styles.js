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
    paddingTop: Mixin.moderateSize(12),
    marginBottom: Mixin.moderateSize(12),
  },
  textInfo: {
    color: Colors.PRIMARY,
    fontWeight: '500',
    marginBottom: Mixin.moderateSize(8),
  },
  container: {
    backgroundColor: Colors.WHITE,
    flexDirection: 'row',
    height: 80,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: Colors.LIGHT_GREY,
  },
  boxAmount: {
    borderWidth: 1,
    height: 50,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: Colors.PRIMARY,
    textAlign: 'center',
  },
  viewImg: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    width: Mixin.moderateSize(52),
    height: Mixin.moderateSize(52),
    borderRadius: 8,
  },
  leftContent: {
    flex: 3,
    justifyContent: 'center',
  },
  nameProduct: {
    fontWeight: 'bold',
  },

  viewQuantity: {
    width: '32%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: Mixin.moderateSize(12),
  },
};
export default styles;
