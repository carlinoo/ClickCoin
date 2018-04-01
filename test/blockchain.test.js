const Blockchain = require('../src/blockchain');
const Block = require('../src/block');


// Unit test for Blockchain class
describe('Blockchain', () => {
  let bc, bc2;

  // Before each test run, create a new Blockchain instance
  beforeEach(() => {
    bc = new Blockchain();
    bc2 = new Blockchain();
  });


  // Test the new blockchain instance starts with the genesis block
  it('starts with the genesis block', () => {
	  expect(bc.chain[0]).toEqual(Block.genesis());
  });


  // Test a new block is created and added to the chain
  it('adds a new block', () => {
    const data = 'foo';
    bc.addBlock(data);
    expect(bc.chain[bc.chain.length-1].data).toEqual(data);
  });


  // Test when a new block is added to a chain, check the chain is valid
  it('validates a valid chain', () => {
  	bc2.addBlock('foo');
  	expect(bc.isValidChain(bc2.chain)).toBe(true);
  });


  // Test that a chain with a corrupted genesis block is invalid
  it('invalidates a chain with a corrupt genesis block', () => {
  	bc2.chain[0].data = 'Bad data';
    expect(bc.isValidChain(bc2.chain)).toBe(false);
  });


  // Test that a chain with a corrupted block is invalid
  it('invalidates a corrupt chain', () => {
    bc2.addBlock('foo');
    bc2.chain[1].data = 'Not foo';
    expect(bc.isValidChain(bc2.chain)).toBe(false);
  });

});
