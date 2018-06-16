var express = require('express');
var router = express.Router();

router.get('/',function(req, res){
  res.send({'success' : true , 'message' : 'success'});

});
router.get('/false',function(req, res){
  res.send({'success' : false , 'message' : 'false'});

});
module.exports = router;
