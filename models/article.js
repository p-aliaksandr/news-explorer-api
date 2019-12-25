const mongoose = require('mongoose');
const { urlRegEx } = require('../consts');

// Опишем схему:
const articleSchema = new mongoose.Schema({
  keyword: {
    required: true,
    type: String,
  },
  title: {
    required: true,
    type: String,
  },
  text: {
    required: true,
    type: String,
  },
  date: {
    required: true,
    type: String,
  },
  source: {
    required: true,
    type: String,
  },
  link: {
    required: true,
    type: String,
    match: urlRegEx,
  },
  image: {
    required: true,
    type: String,
    match: urlRegEx,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    select: false,
  },
});

// создаём модель и экспортируем её
module.exports = mongoose.model('article', articleSchema);
