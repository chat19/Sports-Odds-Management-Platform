const cron = require('node-cron');
const { api } = require('./axios');
const task1 = cron.schedule('* 5 * * * *', () => {
  const all = await api.get('/api/Schedule');
  var teams = [];
  var keys = [];
  all.data.forEach(group => {
    group.Leagues.forEach(league => {
      league.Games.forEach(game => {
        if (game.VisitorTeam) {
          const visitor = game.VisitorTeam.TeamName;
          const home = game.HomeTeam.TeamName;

          if (!keys.includes(visitor)) {
            keys.push(visitor);
            const v_teamInfo = {
              old_name: visitor,
              leagueId: game.LeagueId,
              leagueName: league.Name,
            };
            teams.push(v_teamInfo);
          }

          if (!keys.includes(home)) {
            keys.push(home);
            const h_teamInfo = {
              old_name: home,
              leagueId: game.LeagueId,
              leagueName: league.Name,
            };
            teams.push(h_teamInfo);
          }
        }
      });
    });
  });
});

const task2 = cron.schedule('* 10 * * * *', () => {
  console.log('10 minutes');
  const all = await api.get('/api/Schedule');
  // const data = all.map(group=>{

  // })
});

module.exports = task;
