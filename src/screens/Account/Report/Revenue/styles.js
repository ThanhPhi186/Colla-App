import {Colors} from '../../../../styles';

const styles = {
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
    padding: 20,
  },
  containerChart: {
    flex: 2,
    padding: 16,
    backgroundColor: Colors.WHITE,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
    borderRadius: 16,
  },
  chart: {
    flex: 1,
  },
  txtRevenue: {
    fontWeight: 'bold',
  },
};

export default styles;
