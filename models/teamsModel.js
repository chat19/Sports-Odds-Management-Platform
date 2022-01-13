const mongoose = require('../services/mongoose').mongoose;

const Schema = mongoose.Schema;

const TeamsModel = new Schema(
  {
    old_name: {
      type: String,
      unique: true,
    },
    league_name: {
      type: String,
    },
    new_name: {
      type: String,
    },
    logo: {
      type: String,
    },
  },
  { strict: true },
  {
    collection: 'Teams',
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  }
);

module.exports = mongoose.model('TeamsModel', TeamsModel);
