const express = require('express');
const router = express.Router();
const typo2Model = require('../models/typo2Model');
router.post('/', async (req, res) => {
  const type = req.body.type;
  const data = { size: req.body.size, fontFamily: req.body.fontFamily, fontStyle: req.body.fontStyle };
  const update = type === 'heading' ? { font_heading: data } : type === 'body' ? { font_body: data } : { font_sidebar: data };

  const fontUpdate = await typo2Model.updateOne({ table: 'typo' }, update, { upsert: true });

  return res.json({ success: true, data: fontUpdate });
});

module.exports = router;
