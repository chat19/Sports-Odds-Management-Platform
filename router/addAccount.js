const express = require('express');
const router = express.Router();
const usersModel = require('../models/usersModel');

router.post('/', async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const isAdmin = req.body.isAdmin;
  const site = req.body.site;
  const user = await usersModel.findOneAndUpdate(
    { email: email },
    { email: email, password: password, isAdmin: isAdmin, site: site },
    { upsert: true }
  );

  return res.json({ success: true, user: email });
});

module.exports = router;
