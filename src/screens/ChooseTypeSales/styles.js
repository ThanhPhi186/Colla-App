const {Mixin, Colors} = require('../../styles');
const {FONT_SIZE_18} = require('../../styles/Typography');

const styles = {
  title: {
    fontSize: FONT_SIZE_18,
    fontWeight: '400',
  },
  modal: {
    height: Mixin.device_height * 0.18,
    width: Mixin.device_width * 0.9,
    backgroundColor: Colors.WHITE,
    borderRadius: Mixin.moderateSize(8),
    justifyContent: 'space-between',
    ...Mixin.padding(16, 16, 8, 16),
  },
  viewBtn: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  btnCustom: {
    height: 'auto',
    marginLeft: Mixin.moderateSize(12),
  },
};

export default styles;
