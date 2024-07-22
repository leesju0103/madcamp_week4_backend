const mongoose = require('mongoose');

const diarySchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
});

const Diary = mongoose.model('Diary', diarySchema);

module.exports = Diary;
