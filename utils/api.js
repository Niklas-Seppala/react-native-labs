const BASE_URL = 'https://media.mw.metropolia.fi/wbma';
const ROUTES = {
  all: `${BASE_URL}/media`,
  single: (id) => `${BASE_URL}/media/${id}`,
  upload: (file) => `${BASE_URL}/uploads/${file}`,
  login: `${BASE_URL}/login`,
  register: `${BASE_URL}/users`,
  tokenAuth: `${BASE_URL}/users/user`,
  filesByTag: (tag) => `${BASE_URL}/tags/${tag}`
};

export default {
  ROUTES,
  BASE_URL,
};
