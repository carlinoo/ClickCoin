const Block = require('./block');


// This class will represent the Blockchain idea
class Blockchain {
  constructor() {
    this.chain = [Block.genesis()];
  }



  // Method to create and add a block to the chain
  addBlock(data) {
    const lastBlock = this.chain[this.chain.length-1];
    const block = Block.mineBlock(lastBlock, data);
    this.chain.push(block);
    return block;
  }


  // Method to check that the chain is valid by:
  // 1. Checking the firt block is the genesis
  // 2. Checking all the blocks/hashes are properly ordered and not corrupted
  isValidChain(chain) {

    // Check first block is genesis
    if (JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())) {
      return false;
    }

    // Loop through all the chain
    for (let i = 1; i < chain.length; i++) {
      const block = chain[i];
      const lastBlock = chain[i-1];

      // Check if blocks/hashes are properly ordered and not corrupted
      if (block.lastHash !== lastBlock.hash || block.hash !== Block.blockHash(block)) {
        return false;
      }
    }

    return true;
  }

}



module.exports = Blockchain;
