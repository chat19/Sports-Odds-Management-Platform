const express = require('express');
const router = express.Router();
const usersModel = require('../models/usersModel');

router.post('/', async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const user = await usersModel.findOne({ email: email });
  console.log(user);
  if (user && user.password === password)
    res.json({ isAuth: true, isAdmin: user.isAdmin, fullName: user.fullName, email: user.email, site: user.site });
  else res.json({ isAuth: false });
});

module.exports = router;
