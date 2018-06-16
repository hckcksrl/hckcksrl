var express = require('express');
var bodyParser = require('body-parser');
var bkfd2Password = require("pbkdf2-password");
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var hasher = bkfd2Password();
var mysql = require('mysql');
var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);
var app = express();

var login = require('./Route/login');
var logout = require('./Route/logout');
var register = require('./Route/register');
var welcome = require('./Route/welcome');
var chain = require('./Route/Chain');
var Block = require('./Route/Block');
var mail = require('./Route/mail');
var fs = require("fs");
var https = require('https');
var options = {
  key : fs.readFileSync('./key/private.pem'),
  cert : fs.readFileSync('./key/public.pem')
}


app.use(session({
  secret: '243qwssad21sw12%',
  resave: false,
  saveUninitialized: true,
  store: new MySQLStore({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '1111',
    database: 'login'
  })
}));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(passport.initialize());
// app.use(passport.session());
app.use('/auth/login',login);
app.use('/auth/logout',logout);
app.use('/welcome',welcome);
app.use('/auth/register',register);
app.use('/auth/mail',mail);

app.listen(3000,function(){
  console.log('connect 3000');
})
//
// https.createServer(options, app).listen(3000, function() {
//   console.log('hello https');
// })
