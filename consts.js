const urlRegEx = /https?:\/\/([Ww]{3}\.)?([A-Za-z0-9](-?[A-Za-z0-9]+)+(\.[A-Za-z]{2,})+|((2[0-5][0-5]\.|[0-1]?\d?\d?\.){3}(2[0-5][0-5]|[0-1]?\d?\d)))(:\d{2,5})?(\/[\S]*)*/;
const hexRegEx = /^[0-9a-fA-F]{24}$/;
const urlMongo = 'mongodb://localhost:27017/mydb';
const needAuth = 'Необходима авторизация';
const errorServer = 'На сервере произошла ошибка';
const wrongEmail = 'Неправильный формат e-mail';
const noResources = 'Ресурсы не созданы на сервере';
const noArticle = 'Статья с таким id не найдена';
const deleteYourArticles = 'Можно удалять только свои статьи';
const noDataFound = 'Данные о пользователе не найдены';
const wrongData = 'Неправильные почта или пароль';
const successAuth = 'Успешная авторизация!';
const resouceNotFound = 'Запрашиваемый ресурс не найден';
const devKey = 'dev-secret';

module.exports = {
  urlRegEx,
  hexRegEx,
  urlMongo,
  needAuth,
  errorServer,
  wrongEmail,
  noResources,
  noArticle,
  deleteYourArticles,
  noDataFound,
  wrongData,
  successAuth,
  resouceNotFound,
  devKey,
};
