const axios = require('axios').default;

const api = axios.create({
  baseURL: 'https://api.deadwoodbets.com',
  headers: {
    'Content-type': 'application/json',
    'x-plee-apikey': '5FE36FD25FB1516CD2DE582DB75C9',
  },
});

module.exports = {
  api,
};
