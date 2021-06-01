import {device_width} from '../../styles/Mixin';

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content_text: {
    fontSize: 15,
  },
  title_text: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  time_text: {
    fontSize: 14,
    marginTop: 10,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 48 / 2,
    borderWidth: 1,
    borderColor: 'gray',
    marginLeft: 10,
  },
  item: {
    flexDirection: 'row',
    width: device_width,
    justifyContent: 'center',
    paddingVertical: 10,
  },
  box: {
    marginLeft: 6,
    marginRight: 10,
    flex: 5,
  },
};

export default styles;
