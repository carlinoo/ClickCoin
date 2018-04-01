// Block will represent each block of the Blockchain
class Block {
  constructor(timestamp, lastHash, hash, data) {
  	this.timestamp = timestamp;
    this.lastHash = lastHash;
    this.hash = hash;
    this.data = data;
  }


  // Method to display to the console
  toString() {
  	return "BLOCK:\n  - Timestamp: " + this.timestamp + "\n  - Last Hash: " + this.lastHash.substring(0, 10) + "\n  - Hash: " + this.hash.substring(0, 10) + "\n  - Data: " + this.data;
  }
}



// For ES6, we need to export the class
module.exports = Block;
