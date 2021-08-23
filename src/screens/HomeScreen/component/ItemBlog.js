import React, {useCallback, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';

import {images} from '../../../assets';
import {AppText} from '../../../components/atoms';
import {Colors} from '../../../styles';
import {Const} from '../../../utils';

const ItemBlog = props => {
  const {item} = props;
  const [textShown, setTextShown] = useState(false); //To show ur remaining Text
  const [lengthMore, setLengthMore] = useState(false); //to show the "Read more & Less Line"

  const regex = /(<([^>]+)>)/gi;

  const onTextLayout = useCallback(e => {
    setLengthMore(e.nativeEvent.lines.length >= 4); //to check the text is more than 4 lines or not
    // console.log(e.nativeEvent);
  }, []);

  const toggleNumberOfLines = () => {
    //To toggle the show text or hide it
    setTextShown(!textShown);
  };

  return (
    <View style={styles.containerItem}>
      <View style={styles.left}>
        <FastImage
          source={{uri: Const.API.baseUrlImage + item.feature_image}}
          style={styles.avt}
        />
      </View>

      <View style={styles.right}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingRight: 16,
            flex: 1,
          }}>
          <View style={{}}>
            <AppText title style={styles.title}>
              {item.title}
            </AppText>
            <AppText
              numberOfLines={textShown ? undefined : 4}
              onTextLayout={onTextLayout}
              style={styles.content}>
              {item?.content?.replace(regex, '')}
            </AppText>
            {lengthMore ? (
              <Text
                onPress={toggleNumberOfLines}
                style={{
                  marginTop: 8,
                  color: Colors.GREEN_1,
                  textAlign: 'right',
                }}>
                {textShown ? 'Thu gọn' : 'Đọc tiếp'}
              </Text>
            ) : null}
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = {
  containerItem: {
    flexDirection: 'row',
    marginTop: 12,
    borderRadius: 8,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  left: {
    width: '25%',
    alignItems: 'center',
    paddingVertical: 10,
  },
  avt: {
    width: '75%',
    aspectRatio: 1 / 1,
    borderRadius: 5,
  },
  textPro: {
    fontSize: 13,
    color: '#888888',
    marginTop: 3,
  },
  right: {
    width: '75%',
    paddingVertical: 10,
    justifyContent: 'space-around',
  },
  title: {
    flex: 1,
    marginRight: 40,
  },
  icDelete: {
    width: '75%',
    aspectRatio: 1 / 1,
  },
  buttonDel: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 35,
    height: 35,
    position: 'absolute',
    right: 5,
    top: 5,
  },
  textPrice: {
    color: Colors.GREEN_1,
  },
  soluong: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  content: {
    marginTop: 8,
  },
};

export default ItemBlog;
