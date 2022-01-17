const express = require('express');
const router = express.Router();
const sportsModel = require('../models/sportsModel');
router.get('/', async (req, res) => {
  const odds = await sportsModel.find({});
  return res.json(odds);
});

module.exports = router;
