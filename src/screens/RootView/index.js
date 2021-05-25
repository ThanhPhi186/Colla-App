import React, {useEffect} from 'react';
import {View} from 'react-native';
import {useSelector} from 'react-redux';
import {setToken} from '../../services/ServiceHandle';

const RootView = props => {
  const idToken = useSelector(state => state.AuthenOverallReducer.idToken);

  useEffect(() => {
    setToken(idToken);
  }, [idToken]);

  return <View style={{flex: 1}}>{props.children}</View>;
};

export default RootView;
