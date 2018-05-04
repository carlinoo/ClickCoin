const CONFIG = require('../config');
const ChainUtil = require('../chain-util');

// This class represents the Wallet that will indicate the balance of it plus the keys
class Wallet {
  constructor() {
    this.balance = CONFIG["INITIAL_BALANCE"];
    this.keyPair = ChainUtil.genKeyPair();
    this.publicKey = this.keyPair.getPublic().encode('hex');
  }


  // This method will display a wallet formatted properly
  toString() {
    return "Wallet -\n  - Balance:  " + this.balance + "\n  - publicKey:  " + this.publicKey.toString();
  }


  // Return a signed dataHash
  sign(dataHash) {
    return this.keyPair.sign(dataHash);
  }


}



module.exports = Wallet;
