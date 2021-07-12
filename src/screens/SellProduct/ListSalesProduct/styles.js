import {getBottomSpace} from '../../../helpers/iphoneXHelper';
import {Colors} from '../../../styles';

const styles = {
  rowBack: {
    alignItems: 'center',
    backgroundColor: Colors.LIGHT_GREY,
    flex: 1,
  },
  backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
  },
  backRightBtnRight: {
    backgroundColor: Colors.LIGHT_GREY,
    right: 0,
  },
  backTextWhite: {
    color: Colors.WHITE,
  },
  btnPurchase: {
    alignSelf: 'center',
    marginBottom: getBottomSpace(),
  },
};

export default styles;
