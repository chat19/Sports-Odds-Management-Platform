const mongoose = require('../services/mongoose').mongoose;

const Schema = mongoose.Schema;

const LeaguesModel = new Schema(
  {
    old_name: {
      type: String,
      unique: true,
    },
  
    new_name: {
      type: String,
    },
  
  },
  { strict: true },
  {
    collection: 'Leagues',
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  }
);

module.exports = mongoose.model('LeaguesModel', LeaguesModel);
