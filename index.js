const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const router = require('./router');

const path = require('path');
const app = express();
const port = 8080;

app.use(cors());

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, './admin/build')));
app.use(router);
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/admin/build/index.html'));
});

app.listen(process.env.PORT || port, () => {
  console.log(`App listening at http://localhost:${process.env.PORT || port}`);
});
