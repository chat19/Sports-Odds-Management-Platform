const express = require('express');
const router = express.Router();
const typo2Model = require('../models/typo2Model');
router.post('/', async (req, res) => {
  const color = req.body.color;
  const type = req.body.type;
  const update = type === 'heading' ? { color_heading: color } : { color_body: color };
  const colorUpdate = await typo2Model.updateOne({ table: 'typo' }, update, { upsert: true });
  console.log('colorUpdate', colorUpdate);
  return res.json({ success: true, data: colorUpdate });
});

module.exports = router;
