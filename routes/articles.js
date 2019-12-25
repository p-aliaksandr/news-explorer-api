const routerArticles = require('express').Router();
const { getArticles, createArticle, deleteArticle } = require('../controllers/articles');

routerArticles.get('/articles', getArticles);
routerArticles.post('/articles', createArticle);
routerArticles.delete('/articles/articleId', deleteArticle);

module.exports = routerArticles;
