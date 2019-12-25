const routerUsers = require('express').Router();
const { getUsers } = require('../controllers/users');

routerUsers.get('/users/me', getUsers);

module.exports = routerUsers;
