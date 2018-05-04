const ChainUtil = require('../chain-util');


class Transaction {
  constructor() {
    this.id = ChainUtil.id();
    this.input = null;
    this.outputs = [];
  }


  // Static method to generate a new transaction object
  static newTransaction(senderWallet, recipient, amount) {
    const transaction = new this();

    // Sender cannot send amount he doesnt have
    if (amount > senderWallet.balance) {
      console.log(`Amount ${amount} exceeds balance`);
      return;
    }

    transaction.outputs.push(...[
      {
        amount: senderWallet.balance - amount,
        address: senderWallet.publicKey
      },
      {
        amount: amount,
        address: recipient
      }
    ]);

    return transaction;
  }
}




module.exports = Transaction;
