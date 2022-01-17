const express = require('express');
const router = express.Router();
const { api } = require('../services/axios');
const sportsModel = require('../models/sportsModel');

var api_time1 = true,
  api_time2 = true;
setInterval(() => {
  api_time1 = true;
  api_time2 = true;
}, 300 * 1000);

function isComing(inputDate) {
  const today = new Date();
  inputDate = new Date(inputDate);
  return inputDate.setHours(0, 0, 0, 0) >= today.setHours(0, 0, 0, 0);
}

router.get('/', async (req, res) => {
  const force_read = req.query.force_read == 1;
  const site = req.query.site;

  const odds = await sportsModel.find({});
  console.log('force', force_read);
  if (force_read || (site == 1 && api_time1) || (site == 2 && api_time2)) {
    if (site == 1) api_time1 = false;
    if (site == 2) api_time2 = false;

    const all = await api.get('/api/Schedule');
    var games_table = [];
    all.data.forEach(group => {
      group.Leagues.forEach(league => {
        league.Games.forEach(game => {
          if (game.GameLine && isComing(game.GameDateTime) && game.GameStatus === 'Open' && game.Format === 'Game') {
            const visitor = game.VisitorTeam.TeamName;
            const home = game.HomeTeam.TeamName;
            let show = 0;
            if (odds.length > 0) {
              const vOdds = odds.find(x => x.name === visitor)?.odds;
              const hOdds = odds.find(x => x.name === home)?.odds;

              show = vOdds > game.GameLine.VOdds ? 1 : -1;
              if (vOdds === game.GameLine.VOdds) show = 0;
              games_table.push({ name: visitor, odds: game.GameLine.VOdds, show: show });

              show = hOdds > game.GameLine.HOdds ? 1 : -1;
              if (hOdds === game.GameLine.HOdds) show = 0;
              games_table.push({ name: home, odds: game.GameLine.HOdds, show: show });
            } else {
              games_table.push({ name: visitor, odds: game.GameLine.VOdds, show: show });
              games_table.push({ name: home, odds: game.GameLine.HOdds, show: show });
            }
          }
        });
      });
    });
    const bulkWrite = await sportsModel.bulkWrite(
      games_table.map(team => ({
        updateOne: {
          filter: { name: team.name },
          update: { $set: team },
          upsert: true,
        },
      }))
    );

    res.json(all.data);
  } else {
    res.json({ read_ls: true });
  }
});

module.exports = router;
