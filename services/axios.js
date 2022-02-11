const axios = require('axios').default;
const dotenv = require('dotenv');
dotenv.config();
const API_KEY = process.env.API_KEY;

const api = axios.create({
  baseURL: 'https://api.deadwoodbets.com',
  headers: {
    'Content-type': 'application/json',
    'x-plee-apikey': API_KEY,
  },
});

module.exports = {
  api,
};
