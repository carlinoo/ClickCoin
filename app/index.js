const express = require('express');
const bodyParser = require('body-parser');
const Blockchain = require('../blockchain');
const P2PServer = require('./p2p-server');


const HTTP_PORT = process.env.HTTP_PORT || 3001;


const app = express();
const bc = new Blockchain();
const p2pServer = new P2PServer(bc);


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



// Specify in which port to listen to
app.listen(HTTP_PORT, () => {
  console.log("Listening for HTTP Request on port " + HTTP_PORT);
});
p2pServer.listen();
