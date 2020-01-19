const cors = require('cors');

// Массив разешённых доменов
const allowedCors = [
  'https://ablehope.ru',
  'http://ablehope.ru',
  'https://ablehope.github.io/news-explorer-frontend/',
];

module.exports = cors((req, res, next) => {
  const { origin } = req.headers; // Записываем в переменную origin соответствующий заголовок

  // Проверяем, что значение origin есть среди разрешённых доменов
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  next();
});
