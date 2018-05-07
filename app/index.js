const express = require('express');
const bodyParser = require('body-parser');
const Blockchain = require('../blockchain');
const P2PServer = require('./p2p-server');
const Wallet = require('../wallet');
const TransactionPool = require('../wallet/transaction-pool');


const HTTP_PORT = process.env.HTTP_PORT || 3001;


const app = express();
const bc = new Blockchain();
const wallet = new Wallet();
const tp = new TransactionPool();
const p2pServer = new P2PServer(bc, tp);


app.use(bodyParser.json());

// Get request to get all the blocks (the chain)
app.get('/blocks', (req, res) => {
  res.json(bc.chain);
});




// Post request to mine blocks
app.post('/mine', (req, res) => {

  // Add the block to the chain
  const block = bc.addBlock(req.body.data);

  console.log("New block created: " + block.toString());

  // Send our blockchain to all sockets connected
  p2pServer.syncChains();

  // Respond shoing all the blocks in the chain
  res.redirect('/blocks');
});



// Get request to see all transactions
app.get('/transactions', (req, res) => {
  res.json(tp.transactions);  
});



// Post request to create a transaction with the user's wallet
app.post('/transact', (req, res) => {
  const { recipient, amount } = req.body;
  const transaction = wallet.createTransaction(recipient, amount, tp);

  // Broadcast the transaction to all sockets on the network
  p2pServer.broadcastTransaction(transaction);
  res.redirect('/transactions');
});




// Get request see individual's public key
app.get('/public-key', (req, res) => {
  res.json({ publicKey: wallet.publicKey });
});



// Specify in which port to listen to
app.listen(HTTP_PORT, () => {
  console.log("Listening for HTTP Request on port " + HTTP_PORT);
});
p2pServer.listen();
