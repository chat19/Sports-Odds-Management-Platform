const express = require('express');
const router = express.Router();
const login = require('./login');

const addAccount = require('./addAccount');
const updateAccount = require('./updateAccount');
const deleteAccount = require('./deleteAccount');
const getUsers = require('./getUsers');

const all = require('./all');
const getTeams = require('./getTeams');
const getOdds = require('./getOdds');
const getSettings = require('./getSettings');
const getSettings2 = require('./getSettings2');
const saveTeams = require('./saveTeams');
const saveColors = require('./saveColors');
const saveFonts = require('./saveFonts');
const saveColors2 = require('./saveColors2');
const saveFonts2 = require('./saveFonts2');

router.use('/login', login);

router.use('/addAccount', addAccount);
router.use('/getUsers', getUsers);
router.use('/updateAccount', updateAccount);
router.use('/deleteAccount', deleteAccount);

router.use('/all', all);
router.use('/getTeams', getTeams);
router.use('/getOdds', getOdds);
router.use('/getSettings', getSettings);
router.use('/getSettings2', getSettings2);
router.use('/saveTeams', saveTeams);
router.use('/saveColors', saveColors);
router.use('/saveFonts', saveFonts);
router.use('/saveColors2', saveColors2);
router.use('/saveFonts2', saveFonts2);

module.exports = router;
