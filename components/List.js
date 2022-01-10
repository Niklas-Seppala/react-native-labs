import React from 'react';
import {FlatList} from 'react-native';
import {ListItem} from './ListItem';
import {useMedia} from '../hooks/ApiHooks';

export const List = () => {
  const {media} = useMedia();
  return (
    <FlatList
      data={media}
      keyExtractor={(_, i) => i.toString()}
      renderItem={({item}) => <ListItem item={item}></ListItem>}
    />
  );
};
