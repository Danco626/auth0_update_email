const express = require('express');
const path = require('path');
const routes = require('./routes'); 
const { auth } = require("express-openid-connect");
const { appConfig, authConfig } = require('./config/config');

console.log('appConfig', appConfig);
const app = express();

app.use(auth(authConfig));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

app.use((err, req, res, next) => {
  console.log(err);
  res.render('error', {
    message: err.message,
    error: err
  });
});

const port = appConfig.port || 3000;
app.listen(port, () => {
  console.log(`listening on port ${port}`)
})

