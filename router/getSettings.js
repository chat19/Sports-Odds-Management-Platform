const express = require('express');
const router = express.Router();
const typoModel = require('../models/typoModel');

router.get('/', async (req, res) => {
  const settings = await typoModel.find({});
  return res.json(settings[0]);
});

module.exports = router;
