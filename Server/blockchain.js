var keypair = require('keypair');
var sha256 = require('crypto-js/sha256');
var pair = keypair();
var Nodersa = require('node-rsa');
var text = 'hckcksrl/tkfkdgo12';
// var cipher = Crypto.AES.encrypt('Fuck you',pair.private);
// var bytes  = Crypto.AES.decrypt(cipher.toString(), pair.public);
// var plaintext = bytes.toString(Crypto.enc.Utf8);
// console.log(cipher.toString());
// console.log(bytes.toString(Crypto.enc.Utf8));

// console.log(pair.public);

// var publickey = new Nodersa(pair.public);
// var privatekey = new Nodersa(pair.private);
// var enc = publickey.encrypt(text , 'base64');
// var dec = privatekey.decrypt(enc , 'utf-8');
// var key = new Nodersa({b : 512});
// console.log(enc);
// console.log(dec);

//
// var key = new Nodersa(pair,'pkcs1-pem');
//
// var enc = key.encryptPrivate(text , 'base64');
// var dec = key.decryptPublic(enc , 'utf-8');
// console.log(enc);
// var info = dec.split('/');
// console.log(info[0]);
// console.log(info[1]);

const Block = function( index , timestamp , data ){
  this.index = index;
  this.timestamp = timestamp;
  this.data = data;
  this.previousHash = 0;
  this.hash = this.createHash();
}
Block.prototype = {
  createHash: function() {
    return sha256(this.index + this.timestamp + JSON.stringify(this.data) + this.previousHash).toString();
  }
}
const Blockchain = function() {
  this.chain = [this.GenesisBlock()];
}
Blockchain.prototype = {
  GenesisBlock : function () {
    return new Block(0 , new Date().getTime() , 'GenesisBlock');
  },
  getPrevblock : function () {
    return this.chain[this.chain.length - 1];
  },
  addBlock : function (block) {
    block.previousHash = this.getPrevblock().hash;
    block.hash = block.createHash();
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
const blockchain = new Blockchain();
blockchain.addBlock(new Block(1, new Date().getTime(), {"amount" : "Hckcksrl/Login"}));
blockchain.addBlock(new Block(2, new Date().getTime(), {"amount" : "Hckcksrl/Logout"}));
console.log(blockchain);
console.log(blockchain.isChainValid());
blockchain.chain[1].data = {"amount" : "hckcksrl/register"};
for (var i = 1 ; i < blockchain.chain.length ; i++){
  blockchain.chain[1].hash = blockchain.chain[1].createHash();
}
console.log(blockchain);
console.log(blockchain.isChainValid());
