import {Colors, Mixin} from '../../styles';
import {device_width} from '../../styles/Mixin';
import {FONT_SIZE_14} from '../../styles/Typography';

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  title_text: {
    fontSize: FONT_SIZE_14,
    fontWeight: 'bold',
  },
  time_text: {
    marginTop: Mixin.moderateSize(8),
    color: Colors.GRAY,
  },
  content: {
    marginTop: Mixin.moderateSize(8),
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 48 / 2,
    borderWidth: 1,
    borderColor: 'gray',
    marginLeft: Mixin.moderateSize(8),
  },
  item: {
    flexDirection: 'row',
    width: device_width,
    justifyContent: 'center',
    paddingVertical: Mixin.moderateSize(8),
    borderBottomWidth: 2,
    borderColor: Colors.WHITE,
  },
  box: {
    marginLeft: 6,
    marginRight: Mixin.moderateSize(8),
    flex: 5,
  },
};

export default styles;
