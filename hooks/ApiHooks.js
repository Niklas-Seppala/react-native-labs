import {useEffect, useState} from 'react';
import api from '../utils/api';

export const useMedia = () => {
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

  const [media, setMedia] = useState([]);
  useEffect(async () => setMedia(await loadMedia()), []);
  return {media};
};
