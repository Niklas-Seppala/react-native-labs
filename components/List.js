import React, {useEffect, useState} from 'react';
import {FlatList} from 'react-native';
import {ListItem} from './ListItem';
import api from '../utils/api';

const loadMedia = async () => {
  try {
    const response = await fetch(api.ROUTES.all);
    const simpleMedia = await response.json();
    const detailedMedia = await Promise.all(
      simpleMedia.map(async (item) => {
        const thumbResp = await fetch(api.ROUTES.single(item.file_id));
        const thumb = thumbResp.json();
        return thumb;
      })
    );
    return detailedMedia;
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
