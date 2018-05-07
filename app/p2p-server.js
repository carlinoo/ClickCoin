const Websocket = require('ws');

const P2P_PORT = process.env.P2P_PORT || 5001;

// An array of all the peers on the form of "ws://localhost:5002", if there isnt any => empty array
const peers = process.env.PEERS ? process.env.PEERS.split(',') : [];

const MESSAGE_TYPES = {
  chain: 'CHAIN',
  transaction: 'TRANSACTION'
};


// This class will represent the P2P Server
class P2PServer {
  constructor(_blockchain, _transactionPool) {
    this.blockchain = _blockchain;
    this.transactionPool = _transactionPool;
    this.sockets = [];
  }


  // This method will listen for changes
  listen() {
    const server = new Websocket.Server({ port: P2P_PORT });

    // Listen when a new socket connects
    server.on('connection', (socket) => {
      this.connectSocket(socket);
    });

    // Connect to all peers through a websocket connection
    this.connectToPeers();

    console.log("Listening to peer-to-peer connection on " + P2P_PORT);
  }



  // Method to connect to all the peers through a websocket connection
  connectToPeers() {
    // REMEMBER: peers loooks like ['ws://localhost:5002']
    peers.forEach(peer => {
      const socket = new Websocket(peer);

      // Event when a peer joins after, connect the socket
      socket.on('open', () => {
        this.connectSocket(socket);
      });
    });
  }


  // Function to add a socket to the list of sockets
  connectSocket(socket) {
    this.sockets.push(socket);

    this.messageHandler(socket);

    // Send to the socket our blockchain version so they can see it
    this.sendChain(socket);

    console.log("Socket Connected");
  }



  // Method to receive a message from the connection
  messageHandler(socket) {
    socket.on('message', message => {
      const data = JSON.parse(message);

      // Logic if receiving a chain or transaction
      switch (data.type) {
        case MESSAGE_TYPES.chain: {
          this.blockchain.replaceChain(data.chain);
          break;
        }

        case MESSAGE_TYPES.transaction: {
          this.transactionPool.updateOrAddTransaction(data.transaction);
          break;
        }
      }

    });
  }



  // Send to the socket our blockchain version so they can see it
  sendChain(socket) {
    socket.send(JSON.stringify({ type: MESSAGE_TYPES.chain, chain: this.blockchain.chain }));
  }



  // Send to all the sockets our blockchain version so they can see it
  syncChains() {
    this.sockets.forEach(socket => {
      this.sendChain(socket);
    });
  }



  // Method to broadcast a transaction to all the sockets on the nextwork
  broadcastTransaction(transaction) {
    this.sockets.forEach(socket => this.sendTransaction(socket, transaction));
  }



  // Method to send a transaction to a single socket
  sendTransaction(socket, transaction) {
    socket.send(JSON.stringify({ type: MESSAGE_TYPES.transaction, transaction: transaction }));
  }
}



module.exports = P2PServer;
