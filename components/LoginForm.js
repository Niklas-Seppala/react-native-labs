import React, {useContext} from 'react';
import {Text} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useForm, Controller} from 'react-hook-form';
import {MainContext} from '../contexts/MainContex';
import {useLogin} from '../hooks/ApiHooks';
import { Button, Card, Input } from 'react-native-elements';

export const LoginForm = () => {
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
  });

  const onSubmit = async (data) => {
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
        <Text style={{fontSize: 24, alignSelf: 'center', marginBottom: 5}}>Log In</Text>
      </Card.Divider>

      <Controller
        name="username"
        control={control}
        rules={{required: true}}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            autoCapitalize="none"
            placeholder="Username"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.username && <Text>This is required</Text>}

      <Controller
        name="password"
        control={control}
        rules={{required: true}}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            autoCapitalize="none"
            placeholder="Password"
            secureTextEntry={true}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.password && <Text>This is required.</Text>}
      <Button title="Sign in" onPress={handleSubmit(onSubmit)} />
    </Card>
  );
};
