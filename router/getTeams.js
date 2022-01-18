const express = require('express');
const router = express.Router();
const { api } = require('../services/axios');
const teamsModel = require('../models/teamsModel');

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
    const teams_db = await teamsModel.find({});

    var teams = [];
    var keys = [];

    all.data.forEach(group => {
      group.Leagues.forEach(league => {
        league.Games.forEach(game => {
          let valid = game.VisitorTeam !== undefined;
          if (view !== 'all') valid = game.GameLine && isComing(game.GameDateTime) && game.GameStatus === 'Open' && game.Format === 'Game';
          if (valid) {
            const visitor = game.VisitorTeam.TeamName;
            const home = game.HomeTeam.TeamName;
            let v_db = [],
              h_db = [];

            const v_find = teams_db.find(x => x.old_name === visitor);
            const h_find = teams_db.find(x => x.old_name === home);
            if (v_find) {
              v_db[0] = v_find.new_name;
              v_db[1] = v_find.logo;
            }
            if (h_find) {
              h_db[0] = h_find.new_name;
              h_db[1] = h_find.logo;
            }

            if (!keys.includes(visitor)) {
              keys.push(visitor);
              const v_teamInfo = {
                old_name: visitor,
                leagueId: game.LeagueId,
                league_name: league.Name,
                db: v_db,
              };
              teams.push(v_teamInfo);
            }

            if (!keys.includes(home)) {
              keys.push(home);
              const h_teamInfo = {
                old_name: home,
                leagueId: game.LeagueId,
                league_name: league.Name,
                db: h_db,
              };
              teams.push(h_teamInfo);
            }
          }
        });
      });
    });

    return res.json(teams);
  } else {
    const teamsSet = await teamsModel.find({});

    return res.json(teamsSet);
  }
});

module.exports = router;
