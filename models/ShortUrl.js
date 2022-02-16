const mongoose = require('mongoose');
const { Schema } = mongoose;
const crypto = require('crypto');

const urlSchema = new Schema({
  original_url: {
    type: String,
    required: true,
    unique: true,
  },
  short_url: {
    type: String,
    required: true,
    unique: true,
    default() {
      const randomString1 = crypto.randomBytes(4).toString('hex');
      return randomString1;
    },
  },
});

const ShortUrl = mongoose.model('ShortUrl', urlSchema, 'urls');

module.exports = ShortUrl;
