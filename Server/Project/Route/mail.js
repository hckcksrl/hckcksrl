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
  var user={
    id : req.body.id,
    site: req.body.site,
    site_id : req.body.site_id,
    password : req.body.password,
  }
  console.log(user);
  var sql = 'INSERT INTO sites SET '+conn.escape(user);
  conn.query(sql,function(err, results){
    if(err){
      console.log(err);
      res.status(500);
    }else{
      blockchain.addBlock(new Block( blockchain.chain.length , new Date().getTime() ,
                                    {"amount" : req.body.site+"/t"+req.body.site_id+"/Register"}))
      sql  = 'SELECT * FROM sites WHERE id = (SELECT id FROM users WHERE id ='+conn.escape(req.body.id)+')';
      conn.query(sql,function(err , site){
        if(err){
          console.log('에러');
        }
        if(site.length === 0) {
          console.log('없음');
        }else{
          res.json({success : true, id : req.body.id , pw : req.body.password , site : site});
        }
      })
    }
  });
});


module.exports = router;
