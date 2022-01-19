const express = require('express');
const router = express.Router();
const leaguesModel = require('../models/leaguesModel');
router.post('/', async (req, res) => {
  const bulkWrite = await leaguesModel.bulkWrite(
    req.body.map(league => ({
      updateOne: {
        filter: { old_name: league.old_name },
        update: { $set: league },
        upsert: true,
      },
    }))
  );

  return res.json({ success: true, data: bulkWrite });
});

module.exports = router;
