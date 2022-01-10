import React, {useEffect, useState} from 'react';
import {FlatList} from 'react-native';
import {ListItem} from './ListItem';

const loadMedia = async () => {
  const url =
    'https://raw.githubusercontent.com/mattpe/wbma/master/docs/assets/test.json';
  try {
    const response = await fetch(url);
    const media = await response.json();
    console.log(media);
    return media;
  } catch (err) {
    console.error(err);
    return [];
  }
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
