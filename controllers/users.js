const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const UnauthorizedError = require('../errors/UnauthorizedError');
const NotFoundError = require('../errors/ForbiddenError');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.getUsers = (req, res, next) => {
  User.findById({ _id: req.user._id })
    .then((user) => {
      if (user.length === 0) {
        throw new NotFoundError('Данные о пользователе не найдены');
      }
      res.send({ name: user.name, email: user.email });
    })
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const { name, email, password } = req.body;

  return bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, email, password: hash,
    }))
    .then((user) => res.status(201).send({
      _id: user._id,
      name: user.name,
      email: user.email,
    }))
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError('Неправильные почта или пароль');
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new UnauthorizedError('Неправильные почта или пароль');
          }
          const token = jwt.sign(
            { _id: user._id },
            NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
            { expiresIn: '7d' },
          );
          return res.cookie('jwt', token, {
            maxAge: 604800000,
            httpOnly: true,
            sameSite: true,
          })
            .send({ message: 'Успешная авторизация!' })
            .end();
        });
    })
    .catch(next);
};
