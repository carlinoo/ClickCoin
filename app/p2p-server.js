const Websocket = require('ws');

const P2P_PORT = process.env.P2P_PORT || 5001;

// An array of all the peers on the form of "ws://localhost:5002", if there isnt any => empty array
const peers = process.env.PEERS ? process.env.PEERS.split(',') : [];


// This class will represent the P2P Server
class P2PServer {
  constructor(_blockchain) {
    this.blockchain = _blockchain;
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
      this.blockchain.replaceChain(data);
    });
  }



  // Send to the socket our blockchain version so they can see it
  sendChain(socket) {
    socket.send(JSON.stringify(this.blockchain.chain));
  }



  // Send to all the sockets our blockchain version so they can see it
  syncChains() {
    this.sockets.forEach(socket => {
      this.sendChain(socket);
    });
  }
}



module.exports = P2PServer;
