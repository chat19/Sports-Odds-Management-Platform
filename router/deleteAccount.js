const express = require('express');
const router = express.Router();
const usersModel = require('../models/usersModel');

router.post('/', async (req, res) => {
  const email = req.body.email;

  const user = await usersModel.findOneAndDelete({ email: email });

  return res.json({ success: true, user: user });
});

module.exports = router;
