const mongoose = require('mongoose');
const database = mongoose.connect('mongodb://localhost/fetcher');
let questionsSchema = mongoose.Schema({
  id: Number,
  product_id: Number,
  body: String,
  asker_name: String,
  helpfulness: Number,
  reported: Boolean,
  date: Date,
});
let answersSchema = mongoose.Schema({
  id: Number,
  body: String,
  date: Date,
  answerer_name: String,
  helpfulness: Number,
  reported: Boolean,
  question_id: Number,
  user_id: String
});
let photosSchema = mongoose.Schema({
  id: Number,
  link: String,
  answer_id: Number
});
let questionsRepo = mongoose.model('questionsRepo', questionsSchema);
let answersRepo = mongoose.model('answersRepo', answersSchema);
let photosRepo = mongoose.model('photosRepo', photosSchema);

module.exports = { database }