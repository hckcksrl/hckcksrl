var express = require('express');
var mysql = require('mysql');
var router = express.Router();

var conn = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '1111',
  database : 'o2'
});

console.log('1111111111');

router.post('/',function(req,res,next){
console.log('1111111111');
  var username = req.body.username;
  var password = req.body.password;
  console.log(username);
  console.log(password);
  conn.query("SELECT * FROM login WHERE username = ? AND password = ?",[username,password],function(err,row,fields){
    if(err){
      console.log(err);
    }
    if(row.length>0){
      res.send({'success' : true , 'message' : row[0].username});
    }else{
      res.send({'success' : false , 'message' : 'fuck you'})
    }
  })

})

module.exports = router;
