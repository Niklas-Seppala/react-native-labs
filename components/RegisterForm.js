import React from 'react';
import {useForm, Controller} from 'react-hook-form';
import {useUser} from '../hooks/ApiHooks';
import {Button, Card, Input, Text} from 'react-native-elements';
import {trimTextFields} from '../utils/forms';
import regex from '../utils/regex';

export const RegisterForm = ({navigation}) => {
  const {postUser, checkUsername} = useUser();

  const {
    control,
    handleSubmit,
    formState: {errors},
    getValues,
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      username: '',
      email: '',
      password: '',
      password_check: '',
      full_name: undefined,
    },
  });

  const onSubmit = async (data) => {
    trimTextFields(data);
    try {
      delete data.password_check;
      if (!(await postUser(data))) {
        throw new Error('User registeration failed');
      }
      navigation.goBack();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card>
      <Card.Divider>
        <Text h4>Register</Text>
      </Card.Divider>

      <Controller
        name="username"
        control={control}
        rules={{
          required: 'Please provide username.',
          minLength: {
            value: 3,
            message: 'Username must be atleast 3 characters.',
          },
          validate: async (value) => {
            // Check if the username is available.
            const result = await checkUsername(value);
            if (!result.available) {
              return 'This username is taken.';
            } else return true;
          },
        }}
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
        name="full_name"
        control={control}
        rules={{minLength: {value: 3, message: 'What kind of name is that?'}}}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            autoCapitalize="none"
            placeholder="Full name (optional)"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            errorMessage={errors.full_name?.message}
          />
        )}
      />
      <Controller
        name="email"
        control={control}
        rules={{
          required: 'Please provide your email',
          pattern: {
            value: regex.email,
            message: 'Please enter valid email address.',
          },
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            autoCapitalize="none"
            leftIcon={{type: 'font-awesome', name: 'envelope', size: 16}}
            placeholder="Email"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            errorMessage={errors.email?.message}
          />
        )}
      />

      <Controller
        name="password"
        control={control}
        rules={{
          required: 'Please provide password',
          minLength: {
            value: 5,
            message: 'Password must be atleast 5 characters',
          },
          pattern: {
            value: regex.password,
            message: 'Atleast one uppercase letter and number',
          },
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            leftIcon={{type: 'font-awesome', name: 'lock', size: 20}}
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

      <Controller
        name="password_check"
        control={control}
        rules={{
          required: 'Please confirm your password',
          validate: (value) => {
            const {password} = getValues();
            if (value.trim() !== password.trim())
              return "Passwords don't match";
            else return true;
          },
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            leftIcon={{type: 'font-awesome', name: 'lock', size: 20}}
            autoCapitalize="none"
            placeholder="Confirm password"
            secureTextEntry={true}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            errorMessage={errors.password_check?.message}
          />
        )}
      />

      <Button title="Register" onPress={handleSubmit(onSubmit)} />
    </Card>
  );
};
