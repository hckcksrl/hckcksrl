var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var FileStore = require('session-file-store')(session);
var bkfd2Password = require("pbkdf2-password");
var hasher = bkfd2Password();
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
    username : 'c',
    password : 'hHyCBL7UK1UT+nHMysCKFScl8cAQybWEsIyzr87RshhC9tyU+hanLFry/yW3aKEWBjAPL48aKIf4RsP0FGmd5gVATIYWwZW6OmXwDgZWF7a4mVNLs1Th2iLyVi8yO7RKDqMOKM7zeK+09fiB7AU3TcNu64GHsYoeE3uidVp/SHU=',
    salt : '!AyG4rfe3OgwNheL+OQgCwq0I0jBIj2IQC+G6/ffzGeLR23f8xWdlwwcY5fQD0DY+jEZbHAF2A8tzcpPrwWnE1A==',
    displayName : 'chanki'
  }
];
app.post('/auth/login',function(req, res){
  var uname = req.body.userName;
  var pwd = req.body.password;
  for(var i=0 ; i<users.length; i++){
    var user = users[i];
    if(uname === user.username){
      return hasher({password:pwd, salt:user.salt},function(err,pass,salt,hash){
        if(hash === user.password){
          req.session.displayName = user.displayName;
          req.session.save(function(){
            res.redirect('/welcome');
          });
        }else{
          res.send('who are you <a href="/auth/login">login</a>');
        }
      });
    }
  }
  var s = `who are you 2<br><a href="/auth/login">login</a><br><h1>${pwd}</h1><br><p>${user.salt}</p><p>${users[0].salt}</p>`;
  res.send(s);
});
// if(uname === user.username && sha256(pwd+user.salt) === user.password){
//   req.session.displayName = user.displayName;
//   return req.session.save(function(){
//     res.redirect('/welcome');
//   });
// }
app.post('/auth/register',function(req, res){
  hasher({password:req.body.password},function(err,pass,salt,hash){
    var user={
      username : req.body.userName,
      password : hash,
      salt : salt,
      displayName : req.body.displayName
    }
    users.push(user);
    req.session.displayName = req.body.displayName;
    req.session.save(function(){
      res.redirect('/welcome');
    });
  });
});

app.get('/auth/register',function(req, res){
  var output = `
  <h1>Register</h1>
  <form action="/auth/register" method="post">
    <p>
      <input type="text" name="userName" placeholder="userName">
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
  console.log('Connected 3003 port!!!');
});
