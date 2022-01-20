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

export const useUser = () => {
  const tokenAuth = async (token) => {
    try {
      const options = {
        method: 'GET',
        headers: {'x-access-token': token},
      };
      const resp = await fetch(api.ROUTES.tokenAuth, options);
      const user = await resp.json();

      if (resp.ok) {
        return user;
      } else {
        throw new Error(user.message);
      }
    } catch (err) {
      throw new Error(err.message);
    }
  };
  return {tokenAuth};
}

export const useLogin = () => {
  const postLogin = async (userCredentials) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userCredentials)
    };
    try {
      const resp = await fetch(api.ROUTES.login, options);
      const json = await resp.json();
      if (resp.ok) {
        return json;
      } else {
        throw new Error(json.error ? `${json.message}: ${json.error}` : json.message);
      }
    } catch (err) {
      throw new Error(error.message);
    }
  };
  
  return {postLogin};
};
