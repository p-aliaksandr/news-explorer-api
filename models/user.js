const mongoose = require('mongoose');
const validator = require('validator');
const { wrongEmail } = require('../consts');

// Опишем схему:
const userSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
    minlength: 2,
    maxlength: 30,
  },
  email: {
    required: true,
    unique: true,
    type: String,
    validate: {
      validator: validator.isEmail,
      message: wrongEmail,
    },
  },
  password: {
    select: false,
    required: true,
    type: String,
  },
});

// создаём модель и экспортируем её
module.exports = mongoose.model('user', userSchema);
