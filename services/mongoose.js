const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');

const db_addr = process.env.MONGO_URI;
let count = 0;

const options = {};
const connectWithRetry = () => {
  mongoose
    .connect(db_addr, options)
    .then(() => {
      console.log('MongoDB Database connection established Successfully.');
    })
    .catch(err => {
      console.log(err);
      console.log('MongoDB connection unsuccessful, retry after 5 seconds. ', ++count);
      setTimeout(connectWithRetry, 5000);
    });
};
connectWithRetry();

exports.mongoose = mongoose;
