var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var FileStore = require('session-file-store')(session);
var bkfd2Password = require("pbkdf2-password");
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var hasher = bkfd2Password();
var app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(session({
  secret: '243qwssad21sw12%',
  resave: false,
  saveUninitialized: true,
  store: new FileStore()
}));
app.use(passport.initialize());
//세션을 사용 그러므로 app.use(session)뒤에 사용
app.use(passport.session());
//session count 증가
app.get('/count',function(req, res){
  if(req.session.count){
    req.session.count++;
  }else{
    req.session.count = 1;
  }
  res.send('count : '+req.session.count);
});
//login
app.get('/auth/login',function(req, res){
  var output = `
  <h1>Login</h1>
  <form action="/auth/login" method="post">
    <p>
      <input type="text" name="username" placeholder="username">
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
//  done의 2번째 인자가 false가 아니면 serializeUser 실행
//  serializeUser 의 user 는 done의 2번째 인자 user
passport.serializeUser(function(user, done) {
  console.log('serializeUser', user);
  done(null, user.username);
});
//  session에 등록되어있으면 다음부터 페이지에 들어오면 collback함수 실행
//  id 값은 serializeUser 의 user.username
passport.deserializeUser(function(id, done) {
  console.log('deserializeUser', id);
  for(var i=0 ; i<users.length; i++){
    var user = users[i];
    if(user.username === id){
      return done(null, user);
    }
  }
});

//  passport 인증 규칙
passport.use(new LocalStrategy(
  function(username, password, done){
    var uname = username;
    var pwd = password;
    for(var i=0 ; i<users.length; i++){
      var user = users[i];
      if(uname === user.username){
        return hasher({password:pwd, salt:user.salt},function(err,pass,salt,hash){
          if(hash === user.password){
            console.log('LocalStrategy', user);
            //  2반째 인자는 login된 사용자에대한 정보를 가지고있는 객체
            done(null, user);
          }else{
            //  false 는 실패
            done(null, false);
          }
        });
      }
    }
    done(null, false);
  }
));
//  passport를 이용한 인증
app.post(
  '/auth/login',
  passport.authenticate(
    'local',
    {
      successRedirect: '/welcome',  //  성공시
      failureRedirect: '/auth/login', //  실페시
      failureFlash: false
    }
  )
);

app.get('/auth/logout',function(req, res){
  req.logout();
  // req.session.save(function(){
    res.redirect('/welcome');
  // });
});

app.get('/welcome',function(req, res){
  //  req.user => deserializeUser 의 2번째 done의 user
  if(req.user && req.user.displayName){
      res.send(`
        <h1>Hello, ${req.user.displayName}</h1>
        <a href="/auth/logout">Logout</a>
        `);
  }else{
    res.send(`
      <h1>Welcome</h1>
      <ul>
        <li><a href="/auth/login">Login</a></li>
        <li><a href="/auth/register">Register</a></li>
      </ul>
      `
    );
  }
});
var users = [
  {
    username : 'hong',
    password : 'hHyCBL7UK1UT+nHMysCKFScl8cAQybWEsIyzr87RshhC9tyU+hanLFry/yW3aKEWBjAPL48aKIf4RsP0FGmd5gVATIYWwZW6OmXwDgZWF7a4mVNLs1Th2iLyVi8yO7RKDqMOKM7zeK+09fiB7AU3TcNu64GHsYoeE3uidVp/SHU=',
    salt : '!AyG4rfe3OgwNheL+OQgCwq0I0jBIj2IQC+G6/ffzGeLR23f8xWdlwwcY5fQD0DY+jEZbHAF2A8tzcpPrwWnE1A==',
    displayName : 'chan'
  },
  {
    username : 'choo',
    password : 'hHyCBL7UK1UT+nHMysCKFScl8cAQybWEsIyzr87RshhC9tyU+hanLFry/yW3aKEWBjAPL48aKIf4RsP0FGmd5gVATIYWwZW6OmXwDgZWF7a4mVNLs1Th2iLyVi8yO7RKDqMOKM7zeK+09fiB7AU3TcNu64GHsYoeE3uidVp/SHU=',
    salt : '!AyG4rfe3OgwNheL+OQgCwq0I0jBIj2IQC+G6/ffzGeLR23f8xWdlwwcY5fQD0DY+jEZbHAF2A8tzcpPrwWnE1A==',
    displayName : 'chanki'
  }
];

app.post('/auth/register',function(req, res){
  hasher({password:req.body.password},function(err,pass,salt,hash){
    var user={
      username : req.body.username,
      password : hash,
      salt : salt,
      displayName : req.body.displayName
    }
    users.push(user);
    req.login(user, function(){
    req.session.save(function(){
      res.redirect('/welcome');
      });
    });
  });
});

app.get('/auth/register',function(req, res){
  var output = `
  <h1>Register</h1>
  <form action="/auth/register" method="post">
    <p>
      <input type="text" name="username" placeholder="username">
    </p>
    <p>
      <input type="password" name="password" placeholder="password">
    <p>
      <input type="text" name="displayName" placeholder="displayName">
    </p>
    </p>
    <p>
      <input type="submit">
  </form>
  `
  res.send(output);
});



app.listen(3004, function(){
  console.log('Connected 3004 port!!!');
});
