import Constants from "expo-constants";

const { manifest } = Constants;

const dev = `http://${manifest.debuggerHost.split(':').shift()}:3000`;
const prod = 'https://media.mw.metropolia.fi/wbma';

const routes = {
  all: `${prod}/media`,
  single: (id) => `${prod}/media/${id}`,
  upload: (file) => `${prod}/uploads/${file}`,
  login: `${prod}/login`,
  register: `${prod}/users`,
  tokenAuth: `${prod}/users/user`,
  filesByTag: (tag) => `${prod}/tags/${tag}`,

  media: {
    post:  `${prod}/media`
  },

  user: {
    byId: (id) => `${prod}/users/${id}`,
    username: (username) => `${prod}/users/username/${username}`,
  },
};

export default {
  ROUTES: routes,
  URL: {
    dev,
    prod
  }
};
