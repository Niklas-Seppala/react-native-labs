import React, {useState} from 'react';
import {Button, Image} from 'react-native-elements';
import colors from '../styling/colors';
import * as ImagePickerUtil from 'expo-image-picker';
import {ActivityIndicator, View, StyleSheet} from 'react-native';

export const ImagePicker = ({selected, onSuccess}) => {
  // const [image, setImage] = useState(null);

  const pickImage = async () => {
    console.log(selected)

    const res = await ImagePickerUtil.launchImageLibraryAsync({
      mediaTypes: ImagePickerUtil.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.7,
    });

    if (!res.cancelled) {
      // setImage(res);
      onSuccess?.call(this, res);
    }
  };

  return (
    <View>
      {selected && (
        <Image
          resizeMode={'contain'}
          source={{uri: selected.uri}}
          containerStyle={styles.item}
          PlaceholderContent={<ActivityIndicator />}
        ></Image>
      )}
      <Button
        onPress={pickImage}
        title="Select file"
        icon={{
          type: 'font-awesome',
          name: 'file',
          size: 16,
          color: colors.light,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    height: 300,
    width: '100%',
  },
});
