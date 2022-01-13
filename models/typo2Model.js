const mongoose = require('../services/mongoose').mongoose;

const Schema = mongoose.Schema;

const Typo2Model = new Schema(
  {
    table: {
      type: String,
      default: 'typo',
    },
    font_heading: {
      size: {
        type: String,
      },
      fontFamily: {
        type: String,
      },
      fontStyle: {
        type: Object,
      },
    },
    font_body: {
      size: {
        type: String,
      },
      fontFamily: {
        type: String,
      },
      fontStyle: {
        type: Object,
      },
    },
    font_sidebar: {
      size: {
        type: String,
      },
      fontFamily: {
        type: String,
      },
      fontStyle: {
        type: Object,
      },
    },
    color_heading: {
      type: String,
    },
    color_body: {
      type: String,
    },
  },
  { strict: true },
  {
    collection: 'Typo',
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  }
);

module.exports = mongoose.model('Typo2Model', Typo2Model);
