const SHA256 = require('crypto-js/sha256');

const DIFFICULTY = 4;

// Block will represent each block of the Blockchain
class Block {
  constructor(timestamp, lastHash, hash, data, nonce) {
  	this.timestamp = timestamp;
    this.lastHash = lastHash;
    this.hash = hash;
    this.data = data;
    this.nonce = nonce;
  }


  // Static method to generate the genesis block, which is the first one
  static genesis() {
  	return new this('Genesis time', '-----', 'f1r57-h45h', [], 0);
  }


  // Static method to generate a hash passing the timestamp, lastHash and data
  static hash(timestamp, lastHash, data, nonce) {
  	return SHA256(`${timestamp}${lastHash}${data}${nonce}`).toString();
  }


  // Static method to return a new instance of a block that has been mined
  static mineBlock(lastBlock, data) {
  	const lastHash = lastBlock.hash;
    let hash, timestamp;
    let nonce = 0;

    // Proof of work
    do {
      nonce++;
      timestamp = Date.now();
      hash = Block.hash(timestamp, lastHash, data, nonce);

    // Until the DIFFICULTY first number of zeros match hash
  } while(hash.substring(0, DIFFICULTY) !== '0'.repeat(DIFFICULTY));

    return new this(timestamp, lastHash, hash, data, nonce);
  }


  // Method to display to the console
  toString() {
  	return "BLOCK:\n  - Timestamp:  " + this.timestamp + "\n  - Nonce:  " + this.nonce + "\n  - Last Hash:  " + this.lastHash.substring(0, 10) + "\n  - Hash:       " + this.hash.substring(0, 10) + "\n  - Data:       " + this.data;
  }


  // Wrapper to generate a hash from a block
  static blockHash(block) {
  	const { timestamp, lastHash, data, nonce } = block;
    return Block.hash(timestamp, lastHash, data, nonce);
  }
}



// For ES6, we need to export the class
module.exports = Block;
