const express = require('express');
const router = express.Router();
const typoModel = require('../models/typoModel');
router.post('/', async (req, res) => {
  const color = req.body.color;
  const type = req.body.type;
  const update = type === 'heading' ? { color_heading: color } : { color_body: color };
  const colorUpdate = await typoModel.updateOne({ table: 'typo' }, update, { upsert: true });

  return res.json({ success: true, data: colorUpdate });
});

module.exports = router;
