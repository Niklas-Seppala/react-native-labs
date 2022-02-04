import {useContext, useEffect, useState} from 'react';
import {MainContext} from '../contexts/MainContex';
import api from '../utils/api';
const APP_TAG = '098fea725eb66a1';

const options = {
  EMPTY: {},
  build: (method, body, token, formdata) => {
    const options = {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
    };
    if (body) options.body = JSON.stringify(body);
    if (token) options.headers['x-access-token'] = token;
    if (formdata) options.headers['Content-Type'] = 'multipart/form-data';
    return options;
  },
};

const handleFetch = async (url, options = {}, nested) => {
  try {
    const resp = await fetch(url, options);

    if (resp.status >= 500) {
      throw new Error('Oopsie woopsie: ' + resp.status);
    }

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

export const useTag = () => {
  const postTag = async (id, token) => {
    return await handleFetch(
      api.routes.tag.post,
      options.build(
        'POST',
        {
          file_id: id,
          tag: APP_TAG,
        },
        token
      )
    );
  };

  return {postTag};
};

export const useMedia = () => {
  const postMedia = async (formData, token) => {
    const options = {
      method: 'POST',
      headers: {
        'x-access-token': token,
        'Content-Type': 'multipart/form-data',
      },
      body: formData,
    };

    const result = await handleFetch(api.routes.media.post, options);
    return result;
  };

  const loadMedia = async () => {
    return handleFetch(
      api.routes.tag.files(APP_TAG),
      options.EMPTY,
      async (item) => {
        const thumbResp = await fetch(api.routes.single(item.file_id));
        const thumb = thumbResp.json();
        return thumb;
      }
    );
  };

  const [media, setMedia] = useState([]);
  const {upload} = useContext(MainContext);

  useEffect(async () => setMedia(await loadMedia()), [upload]);

  return {media, postMedia};
};

export const useUser = () => {
  const checkUsername = async (username) =>
    await handleFetch(api.routes.user.username(username), options.build('GET'));

  const authenticate = async (token) =>
    await handleFetch(api.routes.tokenAuth, options.build('GET', null, token));

  const postUser = async (data) =>
    await handleFetch(api.routes.register, options.build('POST', data));

  const getUser = async (id, token) =>
    await handleFetch(
      api.routes.user.byId(id),
      options.build('GET', null, token)
    );

  const getAvatar = async (id, token) =>
    await handleFetch(
      api.routes.tag.files(`avatar_${id}`),
      options.build('GET', null, token)
    );

  return {authenticate, postUser, getAvatar, getUser, checkUsername};
};

export const useLogin = () => {
  const postLogin = async (userCredentials) =>
    await handleFetch(api.routes.login, options.build('POST', userCredentials));

  return {postLogin};
};
