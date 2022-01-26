import React, {useContext, useEffect} from 'react';
import PropTypes from 'prop-types';
import {MainContext} from '../contexts/MainContex';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useUser} from '../hooks/ApiHooks';
import {LoginForm} from '../components/LoginForm';
import {RegisterForm} from '../components/RegisterForm';
import {TouchableOpacity, KeyboardAvoidingView, Keyboard} from 'react-native';

const Login = ({navigation}) => {
  const {setIsLoggedIn, isLoggedIn, setUser, setToken} =
    useContext(MainContext);
  const {authenticate} = useUser();

  const checkToken = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (token) {
        const user = await authenticate(token);
        if (user) {
          setToken(token);
          setUser(user);
          setIsLoggedIn(true);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  if (isLoggedIn) navigation.navigate('Tabs');

  return (
    <TouchableOpacity activeOpacity={1} onPress={() => Keyboard.dismiss()}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : ''}>
        <LoginForm />
        <RegisterForm />
      </KeyboardAvoidingView>
    </TouchableOpacity>
  );
};

Login.propTypes = {
  navigation: PropTypes.object,
};

export default Login;
