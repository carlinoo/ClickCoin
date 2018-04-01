const Block = require('../../blockchain/block');
// const block = new Block();
const firstBlock = Block.genesis();
const secondBlock = Block.mineBlock(firstBlock, 'second');
const thirdBlock = Block.mineBlock(secondBlock, 'third');
const fourthBlock = Block.mineBlock(thirdBlock, 'fourth');


console.log(firstBlock.toString());
console.log(secondBlock.toString());
console.log(thirdBlock.toString());
console.log(fourthBlock.toString());
