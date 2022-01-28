import React from 'react';
import PropTypes from 'prop-types';
import {RegisterForm} from '../components/RegisterForm';
import {TouchableOpacity, KeyboardAvoidingView, Keyboard} from 'react-native';

const Register = ({navigation}) => {
  return (
    <TouchableOpacity activeOpacity={1} onPress={() => Keyboard.dismiss()}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : ''}>
        <RegisterForm navigation={navigation} />
      </KeyboardAvoidingView>
    </TouchableOpacity>
  );
};

Register.propTypes = {
  navigation: PropTypes.object,
};

export default Register;
