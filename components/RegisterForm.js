import React from 'react';
import {useForm, Controller} from 'react-hook-form';
import {useUser} from '../hooks/ApiHooks';
import {Button, Card, Input, Text} from 'react-native-elements';
import {trimTextFields} from '../utils/forms';

export const RegisterForm = ({navigation}) => {
  const {postUser} = useUser();

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      username: '',
      email: '',
      password: '',
      full_name: undefined,
    },
  });

  const onSubmit = async (data) => {
    trimTextFields(data);
    try {
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
        name="email"
        control={control}
        rules={{required: true}}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            autoCapitalize="none"
            placeholder="Email"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.email && <Text>This is required.</Text>}

      <Controller
        name="full_name"
        control={control}
        rules={{required: false}}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            autoCapitalize="none"
            placeholder="Full name"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.full_name && <Text>This is required.</Text>}

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
            onChangeText={(e) => onChange(e.trim())}
            value={value}
          />
        )}
      />
      {errors.password && <Text>This is required.</Text>}

      <Button title="Register" onPress={handleSubmit(onSubmit)} />
    </Card>
  );
};
