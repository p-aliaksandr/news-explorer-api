const cors = require('cors');

// Массив разешённых доменов
const allowedCors = [
  'https://ablehope.ru',
  'http://ablehope.ru',
  'https://www.ablehope.ru',
  'http://www.ablehope.ru',
  'https://ablehope.github.io',
  'http://ablehope.github.io',
  'http://localhost:8080',
];

module.exports = cors({
  origin: allowedCors,
});
