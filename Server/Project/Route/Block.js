var sha256 = require('crypto-js/sha256');

const Block = function( index , timestamp , data ){
  this.index = index;
  this.timestamp = timestamp;
  this.data = data;
  this.previousHash = 0;
  this.hash = this.createHash();
  this.nonce = 0;
}
Block.prototype = {
  createHash : function() {
    return sha256(this.index + this.timestamp + JSON.stringify(this.data) + this.previousHash + this.nonce).toString();
  },
  mineBlock : function(difficulty){
    while(this.hash.substring(0, difficulty) !== Array(difficulty +1).join("0")){
      this.nonce++;
      this.hash = this.createHash();
    }
  }
}


module.exports = Block;
