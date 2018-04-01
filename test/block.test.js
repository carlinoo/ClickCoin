const Block = require('../src/block');

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


});
