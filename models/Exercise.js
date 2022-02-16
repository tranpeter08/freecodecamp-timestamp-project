const mongoose = require('mongoose');
const { Schema } = mongoose;

const exerciseSchema = new Schema({
  description: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: new Date(),
  },
  user_id: {
    type: String,
    required: true,
  },
});

const Exercise = mongoose.model('Exercise', exerciseSchema, 'exercises');

module.exports = Exercise;
