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

    Transaction.signTransaction(transaction, senderWallet);

    return transaction;
  }




  // Sign a transaction
  static signTransaction(transaction, senderWallet) {
    transaction.input = {
      timestamp: Date.now(),
      amount: senderWallet.balance,
      address: senderWallet.publicKey,
      signature: senderWallet.sign(ChainUtil.hash(transaction.outputs))
    }
  }


  // Method to verify a transaction is valid
  static verifyTransaction(transaction) {
    return ChainUtil.verifySignature(transaction.input.address, transaction.input.signature, ChainUtil.hash(transaction.outputs));
  }


  update(senderWallet, recipient, amount) {
    const senderOutput = this.outputs.find(output => output.address === senderWallet.publicKey);

    if (amount > senderOutput.amount) {
      console.log(`Amount ${amount} exceeds balance`);
      return;
    }

    senderOutput.amount = senderOutput.amount - amount;

    this.outputs.push({ amount: amount, address: recipient });

    // Signature is now not valid, so we need to generate a new one
    Transaction.signTransaction(this, senderWallet);

    return this;
  }
}




module.exports = Transaction;
