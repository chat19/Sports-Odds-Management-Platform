const express = require('express');
const router = express.Router();
const { api } = require('../services/axios');
const leaguesModel = require('../models/leaguesModel');

function isComing(inputDate) {
    const today = new Date();
    inputDate = new Date(inputDate);
    return inputDate.setHours(0, 0, 0, 0) >= today.setHours(0, 0, 0, 0);
}

router.get('/', async (req, res) => {
    const type = req.query.type;
    const view = req.query.view;
    if (type === 'set') {
        const all = await api.get('/api/Schedule');
        const leagues_db = await leaguesModel.find({});

        var leagues = [];

        all.data.forEach(group => {
            group.Leagues.forEach(league => {
                const name = league.Name;
                const db_name = leagues_db.find(x => x.old_name === name)?.new_name;
                leagues.push({
                    old_name: name,
                    db: db_name
                })

            });
        });

        return res.json(leagues);
    } else {
        const leaguesSet = await leaguesModel.find({});
        return res.json(leaguesSet);
    }
});

module.exports = router;
