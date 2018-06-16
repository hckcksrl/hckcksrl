var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var MySQLStore = require('express-mysql-session')(session);
var bkfd2Password = require("pbkdf2-password");
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var hasher = bkfd2Password();
var mysql      = require('mysql');
var conn = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '1111',
  database : 'o2'
});
conn.connect();

var app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(session({
  secret: '243qwssad21sw12%',
  resave: false,
  saveUninitialized: true,
  store: new MySQLStore({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '1111',
    database: 'o2'
  })
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
  done(null, user.authId);
});
//  session에 등록되어있으면 다음부터 페이지에 들어오면 collback함수 실행
//  id 값은 serializeUser 의 user.username
passport.deserializeUser(function(id, done) {
  console.log('deserializeUser', id);
  var sql = 'SELECT * FROM users WHERE authId=?';
  conn.query(sql,[id], function(err , results){
    if(err){
      console.log(err);
      done('There is no user.');
    }else{
      done(null , results[0]);
    }
  })
  // for(var i=0 ; i<users.length; i++){
  //   var user = users[i];
  //   if(user.authId === id){
  //     return done(null, user);
  //   }
  // }
});

//  passport 인증 규칙
passport.use(new LocalStrategy(
  function(username, password, done){
    var uname = username;
    var pwd = password;
    var sql = 'SELECT * FROM users WHERE authId=?';
    conn.query(sql,['local:'+uname],function(err, results){
      console.log(results);
      if(err){
        return done('There is no user.');
      }
      var user = results[0];
      console.log(user);
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
    });
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


app.post('/auth/register',function(req, res){
  hasher({password:req.body.password},function(err,pass,salt,hash){
    var user={
      authId : 'local:'+req.body.username,
      username : req.body.username,
      password : hash,
      salt : salt,
      displayName : req.body.displayName,
      email : 'hckcksrl@hanmail.net'
    }
    var sql = 'INSERT INTO users SET ?';
    conn.query(sql,user,function(err, results){
      if(err){
        console.log(err);
        res.status(500);
      }else{
        req.login(user, function(){
        req.session.save(function(){
          res.redirect('/welcome');
          });
        });
      }
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
