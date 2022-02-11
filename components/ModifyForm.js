import React, {useContext} from 'react';
import {useForm, Controller} from 'react-hook-form';
import {Button, Card, Input, Text} from 'react-native-elements';
import {useMedia} from '../hooks/ApiHooks';
import {MainContext} from '../contexts/MainContex';
import {StyleSheet, View} from 'react-native';

const UpdateForm = ({onSuccess, item}) => {
  const {putMedia} = useMedia();
  const {upload, setUpload, token} = useContext(MainContext);

  const {
    control,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm({
    defaultValues: {
      title: item.title,
      description: item.description,
    },
    mode: 'onBlur',
  });

  const onSubmit = async (data) => {
    try {
      setUpload(true);
      await putMedia(item.file_id, data, token);
      setTimeout(() => {
        onSuccess?.call();
        setUpload(false);
      }, 1000);
    } catch (error) {
      console.error(error);
      setUpload(false);
    }
  };

  return (
    <>
      <Card.Divider>
        <Text h4>Upload file</Text>
      </Card.Divider>

      <Controller
        name="title"
        control={control}
        rules={{required: 'Please provide title for upload.'}}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            autoCapitalize="none"
            placeholder="Title"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            errorMessage={errors.title?.message}
          />
        )}
      />

      <Controller
        name="description"
        control={control}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            autoCapitalize="none"
            placeholder="Description"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            errorMessage={errors.description?.message}
          />
        )}
      />

      <View style={styles.horizontal}>
        <Button onPress={() => reset()} title="Reset" />
        <Button
          loading={upload}
          title="Update"
          onPress={handleSubmit(onSubmit)}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
});

export default UpdateForm;
