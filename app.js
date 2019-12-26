const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
// const rateLimit = require('express-rate-limit');
const { errors } = require('celebrate');
const auth = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { createUser, login } = require('./controllers/users');
const { signinValidation, signupValidation } = require('./validationData');
const { urlMongo, limiter } = require('./consts');

// Слушаем 3000 порт
const { PORT = 3000 } = process.env;

const app = express();

// Модуль helmet поставляет автоматически заголовки безопасности
app.use(helmet());

// Подключаемся к серверу mongo
mongoose.connect(urlMongo, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // за 15 минут
//   max: 100, // можно совершить максимум 100 запросов с одного IP
// });

// Подключаем rate-limiter
app.use(limiter);

// Подключаем логгер запросов
app.use(requestLogger);

// Для собирания JSON-формата
app.use(bodyParser.json());
// Для приёма веб-страниц внутри POST-запроса
app.use(bodyParser.urlencoded({ extended: true }));

// Роутеры не требующие авторизации, регистрация и логин(с валидацией)
app.post('/signup', signupValidation, createUser);
app.post('/signin', signinValidation, login);

// Авторизация
app.use(auth);

// Роутеры
app.use('/', require('./routes/users'));
app.use('/', require('./routes/articles'));

// Подключаем логгер ошибок
app.use(errorLogger);

// Обработчик ошибок celebrate
app.use(errors());

// Централизованный обработчик ошибок
// eslint-disable-next-line
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server has been started on port ${PORT}`);
});
