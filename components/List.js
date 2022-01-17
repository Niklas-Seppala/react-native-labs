import React from 'react';
import {FlatList} from 'react-native';
import {ListItem} from './ListItem';
import {useMedia} from '../hooks/ApiHooks';
import PropTypes from 'prop-types';

export const List = ({navigation}) => {
  const {media} = useMedia();
  return (
    <FlatList
      data={media}
      keyExtractor={(_, i) => i.toString()}
      renderItem={({item}) => <ListItem navigation={navigation} item={item} />}
    />
  );
};

List.propTypes = {
  navigation: PropTypes.object,
};
