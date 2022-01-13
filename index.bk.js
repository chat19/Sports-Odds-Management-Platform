// import fetch from 'node-fetch';
// import express from 'express';
// import bodyParser from 'body-parser';
// import cors from 'cors';

const fetch = require('node-fetch');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 8080;
var api_time = true;

app.use(cors());

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(express.json());
app.use(express.static('public'));
app.get('/all', (req, res) => {
  const force_read = req.query.force_read == 1;
  console.log('force', force_read);
  const url = 'https://api.deadwoodbets.com/api/Schedule';
  if (force_read || api_time) {
    api_time = false;
    fetch(url, {
      method: 'get',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        'x-plee-apikey': '5FE36FD25FB1516CD2DE582DB75C9',
      },
    })
      .then(response => response.json())
      .then(response => {
        res.json(response);
      });
  } else {
    res.json({ read_ls: true });
  }
});
setInterval(() => {
  api_time = true;
}, 300 * 1000);

app.post('/webhook', async (req, res) => {
  console.log('requ', req.body);
});

app.get('/getTeams', async (req, res) => {
  const url = 'https://api.deadwoodbets.com/api/Schedule';
  fetch(url, {
    method: 'get',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
      'x-plee-apikey': '5FE36FD25FB1516CD2DE582DB75C9',
    },
  })
    .then(response => response.json())
    .then(response => {
      res.json(response);
    });
});

app.listen(process.env.PORT || port, () => {
  console.log(`App listening at http://localhost:${process.env.PORT || port}`);
});
