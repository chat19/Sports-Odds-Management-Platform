const express = require('express');
const router = express.Router();
const teamsModel = require('../models/teamsModel');
router.post('/', async (req, res) => {
  const bulkWrite = await teamsModel.bulkWrite(
    req.body.map(team => ({
      updateOne: {
        filter: { old_name: team.old_name },
        update: { $set: team },
        upsert: true,
      },
    }))
  );

  return res.json({ success: true, data: bulkWrite });
});

module.exports = router;
