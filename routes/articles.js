const routerArticles = require('express').Router();
const { getArticles, createArticle, deleteArticle } = require('../controllers/articles');
const { articleValidation, deleteArticleValidation } = require('../validationData');

routerArticles.get('/articles', getArticles);
routerArticles.post('/articles', articleValidation, createArticle);
routerArticles.delete('/articles/:articleId', deleteArticleValidation, deleteArticle);

module.exports = routerArticles;
