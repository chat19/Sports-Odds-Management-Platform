const mongoose = require('../services/mongoose').mongoose;

const Schema = mongoose.Schema;

const SportsModel = new Schema(
  {
    name: {
      type: String,
      unique: true,
    },
    odds: {
      type: Number,
    },
    show: {
      type: Number,
      default: 0,
    },
  },
  { strict: true },
  {
    collection: 'sports',
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  }
);

module.exports = mongoose.model('SportsModel', SportsModel);
