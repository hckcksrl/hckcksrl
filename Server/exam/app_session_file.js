var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var FileStore = require('session-file-store')(session);
var app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(session({
  secret: '243qwssad21sw12%',
  resave: false,
  saveUninitialized: true,
  store: new FileStore()
}));

app.get('/count',function(req, res){
  if(req.session.count){
    req.session.count++;
  }else{
    req.session.count = 1;
  }
  res.send('count : '+req.session.count);
});

app.get('/auth/login',function(req, res){
  var output = `
  <h1>Login</h1>
  <form action="/auth/login" method="post">
    <p>
      <input type="text" name="userName" placeholder="userName">
    </p>
    <p>
      <input type="password" name="password" placeholder="password">
    </p>
    <p>
      <input type="submit">
  </form>
  `;
  res.send(output);
});

app.get('/auth/logout',function(req, res){
  delete req.session.displayName;
  return req.session.save(function(){
    res.redirect('/welcome');
  })
})

app.get('/welcome',function(req, res){
  if(req.session.displayName){
      res.send(`
        <h1>Hello, ${req.session.displayName}</h1>
        <a href="/auth/logout">Logout</a>
        `);
  }else{
    res.send(`
      <h1>Welcome</h1>
      <a href="/auth/login">Login</a>
      `);
  }
});

app.post('/auth/login',function(req, res){
  var user = {
    username : 'hong',
    password : '111',
    displayName : 'chan'
  };
  var uname = req.body.userName;
  var pwd = req.body.password;
  if(uname === user.username && pwd === user.password){
    req.session.displayName = user.displayName;
    return req.session.save(function(){
      res.redirect('/welcome');
    })
  }else{
    res.send('who are you <a href="/auth/login">login</a>');
  }
  res.send(uname);
})

app.listen(3004, function(){
  console.log('Connected 3003 port!!!');
});
