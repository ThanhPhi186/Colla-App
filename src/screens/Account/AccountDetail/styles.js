import {Colors, Mixin} from '../../../styles';
import {device_width} from '../../../styles/Mixin';

const styles = {
  container: {
    flex: 1,
    paddingHorizontal: Mixin.moderateSize(16),
  },
  image: {
    width: device_width / 4,
    aspectRatio: 1 / 1,
    borderRadius: 100,
    alignSelf: 'center',
    backgroundColor: Colors.WHITE,
    marginTop: Mixin.moderateSize(20),
  },
};

export default styles;
