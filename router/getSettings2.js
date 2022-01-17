const express = require('express');
const router = express.Router();
const typo2Model = require('../models/typo2Model');

router.get('/', async (req, res) => {
  const settings = await typo2Model.find({});
  return res.json(settings[0]);
});

module.exports = router;
