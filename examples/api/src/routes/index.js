const express = require('express');

const booksRouter = require('./books.router');

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/books', booksRouter);
}

module.exports = routerApi;
