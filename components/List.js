import React, {useEffect, useState} from 'react';
import {FlatList} from 'react-native';
import {ListItem} from './ListItem';

const loadMedia = async () => {
  const url =
    'https://raw.githubusercontent.com/mattpe/wbma/master/docs/assets/test.json';
  const response = await fetch(url);
  return await response.json();
};

export const List = () => {
  const [media, setMedia] = useState([]);
  useEffect(async () => setMedia(await loadMedia()), []);
  return (
    <FlatList
      data={media}
      keyExtractor={(_, i) => i.toString()}
      renderItem={({item}) => <ListItem item={item}></ListItem>}
    />
  );
};
