const mongoose = require('mongoose');

const hashDetailScheme = new mongoose.Schema({
  hashId: {
    type: String,
    required: true,
    trim: true,
  },
  movieId: {
    type: String,
    required: true,
    trim: true,
  },
  cinemaHall: {
    type: String,
    required: true,
    trim: true,
  },
  timeSlot: {
    type: String,
    required: true,
    trim: true,
  },
  bookedUserDet: {
    type: Array,
    default: [],
  },
  seatBooked: {
    type: Array,
    default: [],
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const hashDetailTable = new mongoose.model('hashDetail', hashDetailScheme);
module.exports = hashDetailTable;
