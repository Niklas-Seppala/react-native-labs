import React, {useContext} from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import PropTypes from 'prop-types';

import {ListItem as RNEListItem, Button, Avatar} from 'react-native-elements';
import {useMedia} from '../hooks/ApiHooks';
import colors from '../styling/colors';
import api from '../utils/api';
import {MainContext} from '../contexts/MainContex';

const UserFileListItem = ({item, navigation}) => {
  const {deleteMedia} = useMedia();
  const {token, setUpload, upload} = useContext(MainContext);

  return (
    <RNEListItem bottomDivider>
      <Avatar
        avatarStyle={{borderRadius: 5}}
        size="large"
        rounded={false}
        source={{uri: api.routes.upload(item.thumbnails.w160)}}
      />
      <RNEListItem.Content>
        <RNEListItem.Title numberOfLines={1}>{item.title}</RNEListItem.Title>
        <RNEListItem.Subtitle numberOfLines={1}>
          {item.description}
        </RNEListItem.Subtitle>
      </RNEListItem.Content>
      <Button
        onPress={() => navigation.navigate('Single', {item: item})}
        buttonStyle={{paddingHorizontal: 5}}
        icon={{name: 'label', color: colors.light}}
      />
      <Button
        onPress={() => navigation.navigate('Modify', item)}
        buttonStyle={{backgroundColor: '#d6a11c', paddingHorizontal: 5}}
        icon={{name: 'edit', color: colors.light}}
      />
      <Button
        onPress={async () => {
          await deleteMedia(item.file_id, token);
          setUpload(!upload);
        }}
        buttonStyle={{backgroundColor: '#db3218', paddingHorizontal: 5}}
        icon={{name: 'delete', color: colors.light}}
      />
    </RNEListItem>
  );
};

export const MyFiles = ({navigation}) => {
  const {media} = useMedia();
  return (
    <View>
      <FlatList
        data={media}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({item}) => (
          <UserFileListItem navigation={navigation} item={item} />
        )}
      />
    </View>
  );
};

MyFiles.propTypes = {
  navigation: PropTypes.object,
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    paddingBottom: 10,
  },
  text: {
    fontSize: 20,
  },
});

export default MyFiles;
