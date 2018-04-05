const Block = require('../blockchain/block');
const CONFIG = require('../config');

// Unit test for the Block class
describe('Block', () => {
  let data, lastBlock, block;

  // Before each test runs, re-set the values of the variables
  beforeEach(() => {
    data = 'bar';
    lastBlock = Block.genesis();
    block = Block.mineBlock(lastBlock, data);
  });

  // Test the data given matches the input of data
  it('sets the data to match the input', () => {
    expect(block.data).toEqual(data);
  });


  // Test the lastHash of the block is the same as the hash of the lastBlock
  it('sets the lastHash to match the hash of the lastBlock', () => {
    expect(block.lastHash).toEqual(lastBlock.hash);
  });


  // Test the DIFFICULTY is matched to the block hashed
  it('generates a hash that matches the DIFFICULTY', () => {
    expect(block.hash.substring(0, block.difficulty)).toEqual('0'.repeat(block.difficulty));
  });



  // It checks that the difficulty of the block is decreased as the MINE_RATE is double of what it is supposed to be
  it('lowers the difficulty for slowly mined blocks', () => {
    expect(Block.adjustDifficulty(block, block.timestamp + CONFIG["MINE_RATE"]*2)).toEqual(block.difficulty-1);
  });



  // It checks that the difficulty of the block is increased as the MINE_RATE is half of what it is supposed to be
  it('lowers the difficulty for slowly mined blocks', () => {
    expect(Block.adjustDifficulty(block, block.timestamp + CONFIG["MINE_RATE"]/2)).toEqual(block.difficulty+1);
  });


});
