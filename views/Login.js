import React, {useContext, useEffect} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import PropTypes from 'prop-types';
import {MainContext} from '../contexts/MainContex';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {common} from '../style/common';
import { useUser } from '../hooks/ApiHooks';
import { LoginForm } from '../components/LoginForm';


const Login = ({navigation}) => {
  const {setIsLoggedIn, isLoggedIn} = useContext(MainContext);
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

  if (isLoggedIn) {
    navigation.navigate('Tabs');
  }

  return (
    <View style={[common.container, styles.container]}>
      <Text style={styles.header}>Login</Text>
      <LoginForm />
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
  header: {
    fontSize: 26
  }
});

export default Login;
