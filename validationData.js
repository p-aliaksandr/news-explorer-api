const { celebrate, Joi } = require('celebrate');
const { urlRegEx, hexRegEx } = require('./consts');

const signupValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const signinValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const articleValidation = celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required(),
    title: Joi.string().required(),
    text: Joi.string().required(),
    date: Joi.date().required(),
    source: Joi.string().required(),
    link: Joi.string().pattern(urlRegEx).required(),
    image: Joi.string().pattern(urlRegEx).required(),
    owner: Joi.string().pattern(hexRegEx),
  }),
});

const deleteArticleValidation = celebrate({
  params: Joi.object().keys({
    articleId: Joi.string().pattern(hexRegEx),
  }),
});

module.exports = {
  signupValidation,
  signinValidation,
  articleValidation,
  deleteArticleValidation,
};
