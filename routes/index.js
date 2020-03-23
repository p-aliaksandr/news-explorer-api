const routes = require('express').Router();
const BadRequestError = require('../errors/BadRequestError');
const { resouceNotFound } = require('../consts');
const auth = require('../middlewares/auth');
const cors = require('../middlewares/cors');
const routerArticles = require('./articles');
const routerUsers = require('./users');
const userAuthRoute = require('./userAuth');

routes.use('/', userAuthRoute, auth, routerArticles, routerUsers, cors);
routes.use('*', (res, req, next) => {
  next(new BadRequestError(resouceNotFound));
});

module.exports = routes;
