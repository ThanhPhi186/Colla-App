import {Colors} from '../../../styles';
import {device_width} from '../../../styles/Mixin';

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  locationArea: {
    width: device_width,
    flexDirection: 'row',
    borderBottomWidth: 5,
    borderBottomColor: Colors.LIGHT_GREY,
  },
  vitien: {
    width: device_width,
    flexDirection: 'row',
  },
  btnOrdered: {
    bottom: -10,
    width: '100%',
    borderRadius: 0,
  },
  showPrice: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 3,
  },
  textPay: {
    fontSize: 17,
    fontWeight: '500',
    color: 'black',
  },
  textPrice: {
    color: Colors.GREEN_1,
  },
  largeIndicate: {
    width: '100%',
    height: 7,
    backgroundColor: Colors.WHITE_SMOKE,
  },
};
export default styles;
