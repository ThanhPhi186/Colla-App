import {Colors, Mixin} from '../../../styles';
import {FONT_SIZE_16} from '../../../styles/Typography';

const styles = {
  txtEmpty: {
    color: Colors.GRAY,
    fontSize: FONT_SIZE_16,
    textAlign: 'center',
    marginTop: Mixin.moderateSize(80),
  },
  line: {
    width: 20,
    backgroundColor: Colors.LIGHT_GREY,
    height: 1,
    alignSelf: 'center',
  },
};
export default styles;
