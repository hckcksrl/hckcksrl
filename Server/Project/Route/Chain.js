var sha256 = require('crypto-js/sha256');
var Block = require('./Block')

const Blockchain = function() {
  this.chain = [this.GenesisBlock()];
  this.difficulty = 2
}
Blockchain.prototype = {
  GenesisBlock : function () {
    return new Block(0 , new Date(), 'GenesisBlock');
  },
  getPrevblock : function () {
    return this.chain[this.chain.length - 1];
  },
  addBlock : function (block) {
    block.previousHash = this.getPrevblock().hash;
    block.mineBlock(this.difficulty);
    this.chain.push(block);
  },
  isChainValid : function(){
    for(var i = 1 ; i < this.chain.length; i++){
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i-1];

      if(currentBlock.hash !== currentBlock.createHash()){
        return false;
      }
      if(currentBlock.previousHash !== previousBlock.hash){
        return false;
      }
    }
    return true;
  }
}

module.exports = Blockchain;
