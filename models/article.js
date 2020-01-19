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
    type: Date,
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
    select: false,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
});

// создаём модель и экспортируем её
module.exports = mongoose.model('article', articleSchema);
