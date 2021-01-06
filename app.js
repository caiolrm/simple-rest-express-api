const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const { ProductRouter } = require('./routers');
const AuthenticationMiddleware = require('./middlewares/authentication');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(AuthenticationMiddleware);

app.use('/products', ProductRouter);

module.exports = app;