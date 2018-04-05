const CONFIG = require('../config');

// This class represents the Wallet that will indicate the balance of it plus the keys
class Wallet {
  constructor() {
    this.balance = CONFIG["INITIAL_BALANCE"];
    this.keyPair = null;
    this.publicKey = null;
  }


  // This method will display a wallet formatted properly
  toString() {
    return "Wallet -\n  - Balance:  " + this.balance + "\n  - publicKey:  " + this.publicKey.toString();
  }


}
