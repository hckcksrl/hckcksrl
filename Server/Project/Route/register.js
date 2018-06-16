var express = require('express');
var bkfd2Password = require("pbkdf2-password");
var hasher = bkfd2Password();
var mysql      = require('mysql');
var conn = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '1111',
  database : 'login'
});
conn.connect();
var Blockchain = require('./Blockchain');
var chain = require('./Chain');
var Block = require('./Block');
const blockchain = Blockchain.block();

var router = express.Router();

router.post('/',function(req, res){
  hasher({password:req.body.password},function(err,pass,salt,hash){
    var user={
      id : req.body.username,
      pw : hash,
      salt : salt,
    }
    console.log(user);
    var sql = 'INSERT INTO users SET '+conn.escape(user);
    conn.query(sql,function(err, results){
      if(err){
        console.log(err);
        res.status(500);
      }else{
          req.session.save(function(){
            blockchain.addBlock(new Block( blockchain.chain.length , new Date().getTime() , {id : req.body.username , pw : hash , salt :salt }))
            res.json({success : true, id : req.body.username , pw: req.body.password})
            for(var x = 0 ; x < blockchain.chain.length ; x++){
              console.log(blockchain.chain[x].data);
            }
          });
      }
    });
  });
});

router.get('/',function(req, res){
  var output = `
  <h1>Register</h1>
  <form action="/auth/register" method="post">
    <p>
      <input type="text" name="username" placeholder="username">
    </p>
    <p>
      <input type="password" name="password" placeholder="password">
    </p>
      <input type="submit">
  </form>
  `
  res.send(output);
});

module.exports = router;
