import React, {useContext, useEffect} from 'react';
import {View, StyleSheet, Button} from 'react-native';
import PropTypes from 'prop-types';
import {MainContext} from '../contexts/MainContex';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {common} from '../style/common';
import { useLogin } from '../hooks/ApiHooks';

const Login = ({navigation}) => {
  const [isLoggedIn, setIsLoggedIn] = useContext(MainContext);
  const {postLogin} = useLogin();

  const checkToken = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    if (userToken === 'abc') {
      setIsLoggedIn(true);
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  const logIn = async () => {
    const data = {}

    const loginResp = await postLogin(data);
    if (loginResp) {
      console.log(loginResp);
      await AsyncStorage.setItem('userToken', loginResp.token);
      setIsLoggedIn(true);
    }
    
    if (isLoggedIn) {
      navigation.navigate('Tabs');
    }
  };

  return (
    <View style={[common.container, styles.container]}>
      <Button title="Sign in!" onPress={logIn} />
    </View>
  );
};

Login.propTypes = {
  navigation: PropTypes.object,
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Login;
