import React from 'react';
import api from '../utils/api';
import {Image} from 'react-native-elements';
import {ActivityIndicator, StyleSheet} from 'react-native';
import {Video} from 'expo-av';

const Media = ({item}) => {
  return (
    <>
      {item.media_type === 'image' && (
        <Image
          source={{uri: api.routes.upload(item.filename)}}
          containerStyle={styles.media}
          PlaceholderContent={<ActivityIndicator />}
        />
      )}
      {item.media_type === 'video' && (
        <Video
          source={{uri: api.routes.upload(item.filename)}}
          useNativeControls
          resizeMode="cover"
          style={styles.media}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  media: {
    aspectRatio: 1,
    width: '100%',
  },
});


export default Media;
