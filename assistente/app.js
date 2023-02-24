'use strict'
const config = require('./config.js');

var path = require('path');
const express = require('express')
const bodyParser = require("body-parser");
const app = express();
app.use(express.static('../public'))
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); //convert a string no request para JSON, stringify to string


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

var router = express.Router();
app.use(config.baseUrl, router);
var routers_file = require('./router');
routers_file.routers(router,config.baseUrl);

const hostname = 'localhost';
const port = 3001;
app.listen(port, hostname, () => {
  console.log(`Example app listening on port ${port}`)
})