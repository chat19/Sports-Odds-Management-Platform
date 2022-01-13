const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { api } = require('./services/axios');
const teamsModel = require('./models/teamsModel');
const typoModel = require('./models/typoModel');

const app = express();
const port = 8080;
var api_time = true;

app.use(cors());

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(express.json());
app.use(express.static('public'));
app.get('/all', (req, res) => {
  const force_read = req.query.force_read == 1;
  console.log('force', force_read);
  if (force_read || api_time) {
    api_time = false;
    api
      .get('/api/Schedule')
      .then(response => res.json(response.data))
      .catch(err => console.log('err', err));
  } else {
    res.json({ read_ls: true });
  }
});
setInterval(() => {
  api_time = true;
}, 300 * 1000);

function isComing(inputDate) {
  const today = new Date();
  inputDate = new Date(inputDate);
  return inputDate.setHours(0, 0, 0, 0) >= today.setHours(0, 0, 0, 0);
}

app.get('/getTeams', async (req, res) => {
  const type = req.query.type;

  if (type === 'set') {
    const all = await api.get('/api/Schedule');
    const teams_db = await teamsModel.find({});
    var teams = [];
    var keys = [];
    all.data.forEach(group => {
      group.Leagues.forEach(league => {
        league.Games.forEach(game => {
          if (game.VisitorTeam && isComing(game.GameDateTime) && game.GameStatus === 'Open' && game.Format === 'Game') {
            const visitor = game.VisitorTeam.TeamName;
            const home = game.HomeTeam.TeamName;
            let v_db = [],
              h_db = [];

            for (let i = 0; i < teams_db.length; i++) {
              const team = teams_db[i];
              if (team.old_name === visitor) {
                v_db = [team.new_name, team.logo];
                break;
              }
              if (team.old_name === home) {
                h_db = [team.new_name, team.logo];
                break;
              }
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

app.get('/getSettings', async (req, res) => {
  const settings = await typoModel.find({});
  return res.json(settings[0]);
});

app.post('/saveTeams', async (req, res) => {
  // const mg_delete = await teamsModel.deleteMany({});
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

app.post('/saveColors', async (req, res) => {
  // const mg_delete = await typoModel.deleteMany({});
  console.log('req.body', req.body);
  const color = req.body.color;
  const type = req.body.type;
  const update = type === 'heading' ? { color_heading: color } : { color_body: color };
  const colorUpdate = await typoModel.updateOne({ table: 'typo' }, update, { upsert: true });
  console.log('colorUpdate', colorUpdate);
  return res.json({ success: true, data: colorUpdate });
});

app.post('/saveFonts', async (req, res) => {
  const type = req.body.type;
  const data = { size: req.body.size, fontFamily: req.body.fontFamily, fontStyle: req.body.fontStyle };
  const update = type === 'heading' ? { font_heading: data } : type === 'body' ? { font_body: data } : { font_sidebar: data };

  const fontUpdate = await typoModel.updateOne({ table: 'typo' }, update, { upsert: true });
  console.log('fontUpdate', fontUpdate);
  return res.json({ success: true, data: fontUpdate });
});

app.listen(process.env.PORT || port, () => {
  console.log(`App listening at http://localhost:${process.env.PORT || port}`);
});
