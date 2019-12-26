const Article = require('../models/article');
const ForbiddenError = require('../errors/ForbiddenError');
const NotFoundError = require('../errors/NotFoundError');

module.exports.getArticles = (req, res, next) => {
  Article.find({})
    .then((users) => res.send({ data: users }))
    .catch(next);
};

module.exports.createArticle = (req, res, next) => {
  const {
    keyword, title, text, date, source, link, image,
  } = req.body;
  const owner = req.user._id;
  Article.create({
    keyword, title, text, date, source, link, image, owner,
  })
    .then((article) => res.status(201).send({ data: article }))
    .catch(next);
};

module.exports.deleteArticle = (req, res, next) => {
  const { _id } = req.user;
  const { articleId } = req.params;

  Article.findOne({ _id: articleId }).select('+owner')
    .then((article) => {
      if (!article) {
        throw new NotFoundError('Статья с таким id не найдена');
      }
      return article;
    })
    .then((article) => {
      if (String(article.owner) === _id) {
        Article.findByIdAndRemove(articleId)
          .then((data) => res.send(data))
          .catch(next);
      } else {
        throw new ForbiddenError('Можно удалять только свои статьи');
      }
    })
    .catch(next);
};
