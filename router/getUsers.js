const express = require('express');
const router = express.Router();
const usersModel = require('../models/usersModel');

router.get('/', async (req, res) => {
  const users = await usersModel.find({});
  return res.json(users);
});

module.exports = router;
