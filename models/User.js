const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
});

const User = mongoose.model('User', userSchema, 'users');

module.exports = User;
