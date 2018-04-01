const express = require('express');
const bodyParser = require('body-parser');
const Blockchain = require('../blockchain');

const HTTP_PORT = process.env.HTTP_PORT || 3001;

const app = express();
const bc = new Blockchain();


app.use(bodyParser.json());

// Get request to get all the blocks (the chain)
app.get('/blocks', (req, res) => {
  res.json(bc.chain);
});


// Post request to mine blocks
app.post('/mine', (req, res) => {
  const block = bc.addBlock(req.body.data);
  console.log("New block created: " + block.toString());

  res.redirect('/blocks');
});

// Specify in which port to listen to
app.listen(HTTP_PORT, () => {
  console.log("Listening on port " + HTTP_PORT);
});
