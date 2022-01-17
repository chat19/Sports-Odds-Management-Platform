const mongoose = require('../services/mongoose').mongoose;

const Schema = mongoose.Schema;

const UsersModel = new Schema(
  {
    email: {
      type: String,
      unique: true,
    },
    fullName: {
      type: String,
    },
    password: {
      type: String,
    },
    isAdmin: {
      type: Boolean,
    },
    site: {
      type: String,
      default: 'both',
    },
  },
  { strict: true },
  {
    collection: 'Users',
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  }
);

module.exports = mongoose.model('UsersModel', UsersModel);
