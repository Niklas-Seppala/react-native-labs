import React, {useContext} from 'react';
import {Text, View, TextInput, Button, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useForm, Controller} from 'react-hook-form';
import { MainContext } from '../contexts/MainContex';
import { useLogin } from '../hooks/ApiHooks';


export const LoginForm = () => {
  const {setIsLoggedIn, setUser} = useContext(MainContext);
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
    console.log(data);
    try {
      const user = await postLogin(data);
      await AsyncStorage.setItem('userToken', user.token);

      setUser(user.user);
      setIsLoggedIn(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View>
      <Controller
        name="username"
        control={control}
        rules={{required: true}}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            style={styles.textInput}
            autoCapitalize='none'
            placeholder='Username'
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
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.textInput}
            autoCapitalize='none'
            placeholder='Password'
            secureTextEntry={true}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.password && <Text>This is required.</Text>}

      <Button title="Sign in" onPress={handleSubmit(onSubmit)} />
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    margin: 12,
    width: 150,
    borderWidth: 1,
    padding: 5,
    borderRadius: 5,
    fontSize: 18,
    textAlign: 'center'
  },
});