const SHA256 = require('crypto-js/sha256');
const { DIFFICULTY, MINE_RATE } = require('../config');

// Block will represent each block of the Blockchain
class Block {
  constructor(timestamp, lastHash, hash, data, nonce, difficulty) {
  	this.timestamp = timestamp;
    this.lastHash = lastHash;
    this.hash = hash;
    this.data = data;
    this.nonce = nonce;
    this.difficulty = difficulty || DIFFICULTY;
  }


  // Static method to generate the genesis block, which is the first one
  static genesis() {
  	return new this('Genesis time', '-----', 'f1r57-h45h', [], 0, DIFFICULTY);
  }


  // Static method to generate a hash passing the timestamp, lastHash and data
  static hash(timestamp, lastHash, data, nonce, difficulty) {
  	return SHA256(`${timestamp}${lastHash}${data}${nonce}${difficulty}`).toString();
  }


  // Static method to return a new instance of a block that has been mined
  static mineBlock(lastBlock, data) {
  	const lastHash = lastBlock.hash;
    let hash, timestamp;
    let nonce = 0;
    let { difficulty } = lastBlock;

    // Proof of work
    do {
      nonce++;
      timestamp = Date.now();
      // Recalculate the difficulty
      difficulty = this.adjustDifficulty(lastBlock, timestamp);

      hash = Block.hash(timestamp, lastHash, data, nonce, difficulty);

    // Until the DIFFICULTY first number of zeros match hash
    } while(hash.substring(0, difficulty) !== '0'.repeat(difficulty));

    return new this(timestamp, lastHash, hash, data, nonce, difficulty);
  }


  // Method to display to the console
  toString() {
  	return "BLOCK:\n  - Timestamp:  " + this.timestamp + "\n  - Difficulty:  " + this.difficulty + "\n  - Nonce:  " + this.nonce + "\n  - Last Hash:  " + this.lastHash.substring(0, 10) + "\n  - Hash:       " + this.hash.substring(0, 10) + "\n  - Data:       " + this.data;
  }


  // Wrapper to generate a hash from a block
  static blockHash(block) {
  	const { timestamp, lastHash, data, nonce, difficulty } = block;
    return Block.hash(timestamp, lastHash, data, nonce, difficulty);
  }



  // Static method to ajust the difficulty of a block
  static adjustDifficulty(lastBlock, currentTime) {
    let { difficulty } = lastBlock;

    // If the lastBlock was created less than MINE_RATE ago, then increase difficulty, else decrease it
    difficulty = (lastBlock.timestamp + MINE_RATE > currentTime) ? difficulty + 1 : difficulty - 1;

    return difficulty;
  }
}



// For ES6, we need to export the class
module.exports = Block;
