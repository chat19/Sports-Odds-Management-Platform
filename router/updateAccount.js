const express = require('express');
const router = express.Router();
const usersModel = require('../models/usersModel');

router.post('/', async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const fullName = req.body.fullName;
  const user = await usersModel.findOneAndUpdate({ email: email }, { email: email, password: password, fullName: fullName });

  return res.json({ success: true, user: user });
});

module.exports = router;
