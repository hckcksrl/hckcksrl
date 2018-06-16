var express = require('express');
var bkfd2Password = require("pbkdf2-password");
var passport = require('passport');
// var LocalStrategy = require('passport-local').Strategy;
var hasher = bkfd2Password();
var mysql      = require('mysql');
var sha256 = require('crypto-js/sha256');
var chain = require('./Chain');
var Block = require('./Block');
var Blockchain = require('./Blockchain')
var conn = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '1111',
  database : 'login'
});
conn.connect();
var router = express.Router();

const blockchain = Blockchain.block();
console.log(blockchain.chain);

router.post('/',function(req,res){
  var uname = req.body.username;
  var pwd = req.body.password;
  var sql = 'SELECT * FROM users WHERE id='+conn.escape(uname);
  conn.query(sql,function(err, results){
    if(err){
      return res.json({success : false , message : '로그인 실패'})
    }
    if(results.length === 0){
      return res.json({success : false , message : '아이디 실패'})
    }else{
    var user = results[0];
      return hasher({password:pwd, salt:user.salt},function(err,pass,salt,hash){
        if(hash === user.pw){
          blockchain.addBlock(new Block( blockchain.chain.length , new Date(), {"amount" : uname+"/Login"}))
          sql  = 'SELECT * FROM sites WHERE id = (SELECT id FROM users WHERE id ='+conn.escape(uname)+')';
          conn.query(sql,function(err , site){
            if(err){
              console.log('에러');
            }
            if(site.length === 0) {
              console.log('없음');
            }else{
              console.log(site);
              res.json({success : true, id : req.body.username , pw : req.body.password , site : site});
            }
          })
        }else{
          res.json({success : false, message : '비밀번호 실패'})
        }
      });
    }
  });
});


router.get('/',function(req, res){
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


module.exports = router;




// passport.serializeUser(function(user, done) {
//   done(null, user.id);
// });
// //  session에 등록되어있으면 다음부터 페이지에 들어오면 collback함수 실행
// //  id 값은 serializeUser 의 user.username
// passport.deserializeUser(function(id, done) {
//   var sql = 'SELECT * FROM users WHERE id=?';
//   conn.query(sql,[id], function(err , results){
//     if(err){
//       console.log(err);
//       done('There is no user.');
//     }else{
//       done(null , results[0]);
//     }
//   })
//   // done(null,false)
//   // for(var i=0 ; i<users.length; i++){
//   //   var user = users[i];
//   //   if(user.authId === id){
//   //     return done(null, user);
//   //   }
//   // }
// });
//
// //  passport 인증 규칙
// passport.use(new LocalStrategy(
//   function(username, password, done){
//     var uname = username;
//     var pwd = password;
//     var sql = 'SELECT * FROM users WHERE id=?';
//     conn.query(sql,uname,function(err, results){
//       if(err){
//         return done('There is no user.');
//       }
//       console.log(err);
//       var user = results[0];
//       return hasher({password:pwd, salt:user.salt},function(err,pass,salt,hash){
//         if(hash === user.pw){
//           //  2반째 인자는 login된 사용자에대한 정보를 가지고있는 객체
//           done(null, user);
//         }else{
//           //  false 는 실패
//           done(null, false);
//         }
//       });
//     });
//   }
// ));
//  passport를 이용한 인증
