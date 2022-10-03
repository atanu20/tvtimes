const mongoose = require('mongoose');

const bookShowScheme = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    trim: true,
  },
  movieId: {
    type: String,
    required: true,
    trim: true,
  },
  hashId: {
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
  bookDate: {
    type: Date,
  },
  seatNo: {
    type: Array,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const bookShowTable = new mongoose.model('bookShow', bookShowScheme);
module.exports = bookShowTable;
