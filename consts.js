const rateLimit = require('express-rate-limit');

const urlRegEx = /https?:\/\/([Ww]{3}\.)?([A-Za-z0-9](-?[A-Za-z0-9]+)+(\.[A-Za-z]{2,})+|((2[0-5][0-5]\.|[0-1]?\d?\d?\.){3}(2[0-5][0-5]|[0-1]?\d?\d)))(:\d{2,5})?(\/[\S]*)*/;
const hexRegEx = /^[0-9a-fA-F]{24}$/;
const urlMongo = 'mongodb://localhost:27017/mydb';
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // за 15 минут
  max: 100, // можно совершить максимум 100 запросов с одного IP
});

module.exports = {
  urlRegEx,
  hexRegEx,
  urlMongo,
  limiter,
};
