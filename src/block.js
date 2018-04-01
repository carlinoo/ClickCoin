const SHA256 = require('crypto-js/sha256');

// Block will represent each block of the Blockchain
class Block {
  constructor(timestamp, lastHash, hash, data) {
  	this.timestamp = timestamp;
    this.lastHash = lastHash;
    this.hash = hash;
    this.data = data;
  }


  // Static method to generate the genesis block, which is the first one
  static genesis() {
  	return new this('Genesis time', '-----', 'f1r57-h45h', []);
  }


  // Static method to generate a hash passing the timestamp, lastHash and data
  static hash(timestamp, lastHash, data) {
  	return SHA256(`${timestamp}${lastHash}${data}`).toString();
  }


  // Static method to return a new instance of a block that has been mined
  static mineBlock(lastBlock, data) {
  	const timestamp = Date.now();
  	const lastHash = lastBlock.hash;
    const hash = Block.hash(timestamp, lastHash, data);
    return new this(timestamp, lastHash, hash, data);
  }


  // Method to display to the console
  toString() {
  	return "BLOCK:\n  - Timestamp:  " + this.timestamp + "\n  - Last Hash:  " + this.lastHash.substring(0, 10) + "\n  - Hash:       " + this.hash.substring(0, 10) + "\n  - Data:       " + this.data;
  }


  // Wrapper to generate a hash from a block
  static blockHash(block) {
  	const { timestamp, lastHash, data } = block;
    return Block.hash(timestamp, lastHash, data);
  }
}



// For ES6, we need to export the class
module.exports = Block;
