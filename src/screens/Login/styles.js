import {Mixin} from '../../styles';

const styles = {
  viewContent: {
    flex: 1,
    paddingHorizontal: Mixin.moderateSize(32),
  },
  viewLogo: {
    flex: 3,
    justifyContent: 'center',
  },
  img: {
    width: Mixin.moderateSize(120),
    height: Mixin.moderateSize(52),
  },
  viewText: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textHello: {
    fontWeight: 'bold',
    marginBottom: Mixin.moderateSize(10),
  },
  viewInput: {
    flex: 3,
  },
  btnContinue: {
    width: '100%',
    borderRadius: 0,
    bottom: -10,
  },
  viewPhone: {
    width: '100%',
    height: 40,
    marginBottom: 8,
    borderWidth: 0.5,
    borderColor: 'gray',
    paddingHorizontal: 8,
    borderRadius: 8,
    justifyContent: 'center',
  },
};

export default styles;
