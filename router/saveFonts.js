const express = require('express');
const router = express.Router();
const typoModel = require('../models/typoModel');
router.post('/', async (req, res) => {
  const type = req.body.type;
  const data = { size: req.body.size, fontFamily: req.body.fontFamily, fontStyle: req.body.fontStyle };
  const update = type === 'heading' ? { font_heading: data } : type === 'body' ? { font_body: data } : { font_sidebar: data };

  const fontUpdate = await typoModel.updateOne({ table: 'typo' }, update, { upsert: true });
  console.log('fontUpdate', fontUpdate);
  return res.json({ success: true, data: fontUpdate });
});

module.exports = router;
