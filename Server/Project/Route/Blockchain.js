var chain = require('./Chain');
var Block = require('./Block');

var blockchain = new chain();

module.exports = {
  block : function() {
    return blockchain;
  }
}
