import {useEffect, useState} from 'react';
import api from '../utils/api';

const options = {
  EMPTY: {},
  build: (method, body, token) => {
    const options = {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
    };
    if (body) options.body = JSON.stringify(body);
    if (token) options.headers['x-access-token'] = token;
    return options;
  },
};

const handleFetch = async (url, options = {}, nested) => {
  try {
    const resp = await fetch(url, options);
    const json = await resp.json();
    if (resp.ok) {
      if (nested) {
        // Execute nested fetch (ifdef), and return aggregated results.
        if (!(json instanceof Array))
          throw new Error(`Response cant be mapped.`);
        return await Promise.all(json.map(nested));
      }
      return json;
    } else {
      const message = json.error
        ? `${json.message}: ${json.error}`
        : json.message;
      throw new Error(message || resp.statusText);
    }
  } catch (err) {
    throw new Error(err.message);
  }
};

export const useMedia = () => {
  const loadMedia = async () => {
    const fetchDetails = async (item) => {
      const thumbResp = await fetch(api.ROUTES.single(item.file_id));
      const thumb = thumbResp.json();
      return thumb;
    };
    return handleFetch(api.ROUTES.all, options.EMPTY, fetchDetails);
  };

  const [media, setMedia] = useState([]);
  useEffect(async () => setMedia(await loadMedia()), []);
  return {media};
};

export const useUser = () => {
  const authenticate = async (token) =>
    await handleFetch(api.ROUTES.tokenAuth, options.build('GET', null, token));

  const postUser = async (data) =>
    await handleFetch(api.ROUTES.register, options.build('POST', data));

  const getUser = async (id, token) =>
    await handleFetch(
      api.ROUTES.user.byId(id),
      options.build('GET', null, token)
    );

  const getAvatar = async (id, token) =>
    await handleFetch(
      api.ROUTES.filesByTag(`avatar_${id}`),
      options.build('GET', null, token)
    );

  return {authenticate, postUser, getAvatar, getUser};
};

export const useLogin = () => {
  const postLogin = async (userCredentials) =>
    await handleFetch(api.ROUTES.login, options.build('POST', userCredentials));

  return {postLogin};
};
