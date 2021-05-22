const {Colors, Mixin} = require('../../styles');

const styles = {
  containerHeader: {
    backgroundColor: Colors.PRIMARY,
    flex: 1,
    borderBottomLeftRadius: Mixin.moderateSize(40),
    borderBottomRightRadius: Mixin.moderateSize(40),
    paddingHorizontal: 20,
    paddingTop: Mixin.moderateSize(60),
  },
  avatar: {
    width: 40,
    height: 40,
    marginRight: 10,
    backgroundColor: Colors.WHITE,
    borderRadius: 20,
  },
  icClose: {
    width: 22,
    aspectRatio: 1 / 1,
  },

  txtHello: {
    color: Colors.WHITE,
  },
  txtName: {
    color: Colors.WHITE,
    fontWeight: 'bold',
  },
  viewProduct: {
    height: 80,
    width: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#CEDC8F',
  },
  txtProduct: {
    textAlign: 'center',
    marginTop: 8,
  },
};

export default styles;
