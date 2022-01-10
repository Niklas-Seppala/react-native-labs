const BASE_URL = 'https://media.mw.metropolia.fi/wbma';
const ROUTES = {
  all: `${BASE_URL}/media`,
  single: (id) => `${BASE_URL}/media/${id}`,
  upload: (file) => `${BASE_URL}/uploads/${file}`,
};

export default {
  ROUTES,
  BASE_URL,
};
