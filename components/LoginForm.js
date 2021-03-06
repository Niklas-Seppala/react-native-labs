import React, {useContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useForm, Controller} from 'react-hook-form';
import {MainContext} from '../contexts/MainContex';
import {useLogin} from '../hooks/ApiHooks';
import {Button, Card, Input, Text} from 'react-native-elements';
import {TouchableOpacity} from 'react-native';
import {trimTextFields} from '../utils/forms';
import colors from '../styling/colors';

const NoAccount = ({navigation}) => {
  return (
    <>
      <Text h4>Don't have an account?</Text>
      <Card.Divider></Card.Divider>
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={{color: colors.accent}}>Register here</Text>
      </TouchableOpacity>
    </>
  );
};

export const LoginForm = ({navigation}) => {
  const {setIsLoggedIn, setUser, setToken} = useContext(MainContext);
  const {postLogin} = useLogin();
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      username: '',
      password: '',
    },
    mode: 'onBlur',
  });

  const onSubmit = async (data) => {
    trimTextFields(data);
    try {
      const user = await postLogin(data);
      await AsyncStorage.setItem('userToken', user.token);
      setUser(user.user);
      setToken(user.token);
      setIsLoggedIn(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card>
      <Card.Divider>
        <Text h4>Log In</Text>
      </Card.Divider>

      <Controller
        name="username"
        control={control}
        rules={{required: 'Please provide username'}}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            autoCapitalize="none"
            leftIcon={{type: 'font-awesome', name: 'user', size: 16}}
            placeholder="Username"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            errorMessage={errors.username?.message}
          />
        )}
      />

      <Controller
        name="password"
        control={control}
        rules={{required: 'Please provide password'}}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            leftIcon={{type: 'font-awesome', name: 'lock'}}
            autoCapitalize="none"
            placeholder="Password"
            secureTextEntry={true}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            errorMessage={errors.password?.message}
          />
        )}
      />

      <Button title="Sign in" onPress={handleSubmit(onSubmit)} />
      <Card.Divider />
      <NoAccount navigation={navigation} />
    </Card>
  );
};
