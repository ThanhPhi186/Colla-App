import React from 'react';
import {View} from 'react-native';
import {Appbar} from 'react-native-paper';
import {useDispatch} from 'react-redux';
import {AppText} from '../../../components/atoms';
import {Button} from '../../../components/molecules';
import {AuthenOverallRedux} from '../../../redux';
import {setToken} from '../../../services/ServiceHandle';
import {container} from '../../../styles/GlobalStyles';
import {trans} from '../../../utils';
import auth from '@react-native-firebase/auth';

const MainAccount = () => {
  const dispatch = useDispatch();

  const logout = () => {
    auth()
      .signOut()
      .then(
        function () {
          console.log('Signed Out');
        },
        function (error) {
          console.error('Sign Out Error', error);
        },
      );
    dispatch(AuthenOverallRedux.Actions.setToken(''));
    setToken('');
  };

  return (
    <View style={container}>
      <Appbar.Header>
        <Appbar.Content
          style={{alignItems: 'center'}}
          color="white"
          title={trans('personal')}
        />
      </Appbar.Header>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Button title="Đăng xuất" onPress={logout} />
      </View>
    </View>
  );
};

export default MainAccount;
