import React, {useState, useContext} from 'react';
import {useForm, Controller} from 'react-hook-form';
import {Button, Card, Input, Text} from 'react-native-elements';
import {ImagePicker} from './ImagePicker';

import {useMedia} from '../hooks/ApiHooks';
import {extractFileExt, extractFilename} from '../utils/forms';
import {MainContext} from '../contexts/MainContex';

export const UploadForm = ({onSuccess}) => {
  const [img, setImg] = useState(null);
  const [uploading, setUploading] = useState(false);
  const {postMedia} = useMedia();
  const {token} = useContext(MainContext);
  const [allGood, setAllGood] = useState(false);

  const {
    control,
    handleSubmit,
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
      if (!img) throw new Error('No file selected');

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

      setUploading(true);
      const resp = await postMedia(formData, token);
      setUploading(false);

      if (resp.status === 200) onSuccess?.call(this);
      
    } catch (error) {
      console.error(error);
      setUploading(false);
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
        <ImagePicker selected={img} onSuccess={(img) => setImg(img)} />
      </Card.Divider>
      <Button
        disabled={!allGood}
        loading={uploading}
        title="Upload"
        onPress={handleSubmit(onSubmit)}
      />
      <Card.Divider />
    </>
  );
};
