const router = require('express').Router();
const { signinValidation, signupValidation } = require('../validationData');
const { login, createUser } = require('../controllers/users');

router.post('/signin', signinValidation, login);

router.post('/signup', signupValidation, createUser);

module.exports = router;
