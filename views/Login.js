import React, {useContext, useEffect} from 'react';
import {View, StyleSheet, Button} from 'react-native';
import PropTypes from 'prop-types';
import {MainContext} from '../contexts/MainContex';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {common} from '../style/common';
import { useLogin, useUser } from '../hooks/ApiHooks';

const Login = ({navigation}) => {
  const [isLoggedIn, setIsLoggedIn] = useContext(MainContext);
  const {postLogin} = useLogin();
  const {tokenAuth} = useUser();

  const checkToken = async () => {
    const token = await AsyncStorage.getItem('userToken');
    try {
      const user = await tokenAuth(token);
      user && setIsLoggedIn(true);
    } catch (err) {
      console.error(err)
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  const logIn = async () => {
    const data = {}

    try {
      const loginResp = await postLogin(data);
      if (loginResp) {
        await AsyncStorage.setItem('userToken', loginResp.token);
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.error(error)      
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
