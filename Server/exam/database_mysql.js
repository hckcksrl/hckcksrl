var mysql      = require('mysql');
var conn = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '1111',
  database : 'login'
});

conn.connect();
// var sql = 'SELECT * FROM login'
// conn.query(sql,function(err, rows, fields){
//   if(err){
//     console.log(err);
//   }else{
//     for(var i = 0 ; i<rows.length;i++){
//       console.log(rows[i].id);
//     }
//   }
// });
var sql = 'INSERT INTO login (id, passwords) VALUES("hck", "123123")';
conn.query(sql,function(err, rows, fields){
  if(err){
    console.log(err);
  }else{
    console.log(rows);
  }
})
conn.end();
// connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
//   if (error) throw error;
//   console.log('The solution is: ', results[0].solution);
// });
//
// connection.end();
