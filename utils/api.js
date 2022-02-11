import Constants from 'expo-constants';

const {manifest} = Constants;

const dev = `http://${manifest.debuggerHost.split(':').shift()}:3000`;
const prod = 'https://media.mw.metropolia.fi/wbma';

const routes = {
  all: `${prod}/media`,
  single: (id) => `${prod}/media/${id}`,
  upload: (file) => `${prod}/uploads/${file}`,
  login: `${prod}/login`,
  register: `${prod}/users`,
  tokenAuth: `${prod}/users/user`,

  tag: {
    files: (tag) => `${prod}/tags/${tag}`,
    post: `${prod}/tags`,
  },

  favourite: {
    byFileId: (fileId) => `${prod}/favourites/file/${fileId}`,
    post: `${prod}/favourites`,
    delete: (fileId) => `${prod}/favourites/file/${fileId}`,
  },

  media: {
    post: `${prod}/media`,
    delete: (id) => `${prod}/media/${id}`,
    update: (id) => `${prod}/media/${id}`,
  },

  user: {
    byId: (id) => `${prod}/users/${id}`,
    username: (username) => `${prod}/users/username/${username}`,
  },
};

export default {
  routes,
  URL: {
    dev,
    prod,
  },
};
