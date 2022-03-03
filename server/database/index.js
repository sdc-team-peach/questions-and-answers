const mongoose = require('mongoose');
const database = mongoose.connect('mongodb://localhost/fetcher');
let questionsSchema = mongoose.Schema({
  id: Number,
  product_id: Number,
  body: String,
  date_written: Number,
  asker_name: String,
  asker_email: String,
  reported: Number,
  helpful: Number,
});
let answersSchema = mongoose.Schema({
  id: Number,
  question_id: Number,
  body: String,
  date_written: Date,
  answerer_name: String,
  answerer_email: String,
  reported: Number,
  helpful: Number,
});
let photosSchema = mongoose.Schema({
  id: Number,
  answer_id: Number,
  url: String
});
let questionsRepo = mongoose.model('questionsRepo', questionsSchema);
let answersRepo = mongoose.model('answersRepo', answersSchema);
let photosRepo = mongoose.model('photosRepo', photosSchema);

module.exports = { database }