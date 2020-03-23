require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { urlMongo } = require('./consts');
const centralizedErrors = require('./middlewares/CentralizedErrors');
const { limiter } = require('./middlewares/limiter');
const routes = require('./routes/index');

// Слушаем 3000 порт
const { PORT = 3000 } = process.env;

const app = express();

// Модуль helmet поставляет автоматически заголовки безопасности
app.use(helmet());

const { NODE_ENV, MONGO_DB } = process.env;
const db = NODE_ENV === 'production' && MONGO_DB ? MONGO_DB : urlMongo;

// Подключаемся к серверу mongo
mongoose.connect(db, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.route('http://localhost:8080')
  .all((req, res, next) => {
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'X-API-TOKEN, Content-Type, Authorization, Content-Length, X-Requested-With');
    next();
  });

// Подключаем rate-limiter
app.use(limiter);

// Подключаем логгер запросов
app.use(requestLogger);

// Для собирания JSON-формата
app.use(bodyParser.json());
// Для приёма веб-страниц внутри POST-запроса
app.use(bodyParser.urlencoded({ extended: true }));

// Роутеры
app.use(routes);

// Подключаем логгер ошибок
app.use(errorLogger);

// Обработчик ошибок celebrate
app.use(errors());

// Централизованный обработчик ошибок
app.use(centralizedErrors);

app.listen(PORT);
