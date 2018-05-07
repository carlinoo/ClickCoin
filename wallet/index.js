const CONFIG = require('../config');
const Transaction = require('./transaction');
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

  

  // Method to create a transaction and updating one if recent transaction is in the pool
  createTransaction(recipient, amount, transactionPool) {
    if (amount > this.balance) {
      console.log(`Amount ${amount} exceeds the current balance ${this.balance}`);
      return;
    }

    // Get (if any) a transaction from the pool from this wallet
    let transaction = transactionPool.existingTransaction(this.publicKey);

    if (transaction) {
      transaction.update(this, recipient, amount);
    } else {
      transaction = Transaction.newTransaction(this, recipient, amount);
      transactionPool.updateOrAddTransaction(transaction);
    }
    return transaction;
  }

}



module.exports = Wallet;
