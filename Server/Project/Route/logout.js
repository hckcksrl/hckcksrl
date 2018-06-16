var express = require('express');
var router = express.Router();
var login = require('./login');
var chain = require('./Chain');
var Block = require('./Block');
var Blockchain = require('./Blockchain')

var blockchain = Blockchain.block();

router.get('/',function(req, res){
  req.logout();

  // req.session.save(function(){
    res.redirect('/welcome');
  // });
});

module.exports = router;
