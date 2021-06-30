import {Colors} from '../../../styles';

const styles = {
  containerItem: {
    alignSelf: 'center',
    width: '90%',
    backgroundColor: Colors.WHITE,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    paddingHorizontal: 8,
    paddingVertical: 16,
    marginTop: 16,
    borderRadius: 12,
  },
  btnCancel: {
    backgroundColor: Colors.WHITE,
    width: '46%',
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.GREEN_1,
  },
  btnConfirm: {
    backgroundColor: Colors.GREEN_1,
    width: '46%',
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  viewGroupBtn: {
    flexDirection: 'row',
    marginTop: 8,
    width: '60%',
    justifyContent: 'space-between',
  },
};
export default styles;
