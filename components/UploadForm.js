import React, {useState, useContext} from 'react';
import {useForm, Controller} from 'react-hook-form';
import {Button, Card, Input, Text} from 'react-native-elements';
import {ImagePicker} from './ImagePicker';

import {useMedia, useTag} from '../hooks/ApiHooks';
import {extractFileExt, extractFilename} from '../utils/forms';
import {MainContext} from '../contexts/MainContex';
import {StyleSheet, View} from 'react-native';

export const UploadForm = ({onSuccess}) => {
  const [img, setImg] = useState(null);
  const {postMedia} = useMedia();
  const {upload, setUpload} = useContext(MainContext);
  const {token} = useContext(MainContext);
  const [inputIsValid, setInputIsValid] = useState(false);
  const {postTag} = useTag();

  const {
    control,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm({
    defaultValues: {
      title: '',
      description: '',
    },
    mode: 'onBlur',
  });

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      const filename = extractFilename(img.uri);
      const fExtension = extractFileExt(filename);
      const mimetype = `${img.type}/${
        fExtension === 'jpg' ? 'jpeg' : fExtension
      }`;

      const upload = {
        uri: img.uri,
        name: filename,
        type: mimetype,
      };

      formData.append('title', data.title);
      formData.append('description', data.description);
      formData.append('file', upload);

      setUpload(true);
      const uploadResp = await postMedia(formData, token);
      await postTag(uploadResp.file_id, token);
      setTimeout(() => {
        onSuccess?.call();
        setUpload(false);
      }, 2000);
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
      <Card.Divider>
        <ImagePicker
          selected={img}
          onSuccess={(img) => {
            setImg(img);
            setInputIsValid(true);
          }}
        />
      </Card.Divider>
      <View style={styles.horizontal}>
        <Button
          onPress={() => {
            reset();
            setImg(null);
          }}
          title="Reset"
        ></Button>
        <Button
          disabled={!inputIsValid}
          loading={upload}
          title="Upload"
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
