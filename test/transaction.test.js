const Transaction = require("../wallet/transaction");
const Wallet = require("../wallet/index");

describe("Transaction", () => {
  let transaction, wallet, recipient, amount;

  // Generate new objects
  beforeEach(() => {
    wallet = new Wallet();
    amount = 50;
    recipient = 'r3c1p13nt';
    transaction = Transaction.newTransaction(wallet, recipient, amount);    
  });


  // Check that the substraction of the amount of each transaction is done properly
  it('outputs the amount taken away from the wallet balance', () => {
    expect(transaction.outputs.find(output => output.address === wallet.publicKey).amount).toEqual(wallet.balance - amount);
  });


  it('outputs the amount added to recipient', () => {
    expect(transaction.outputs.find(output => output.address === recipient).amount).toEqual(amount);
  });


  it('inputs the balance of the wallet', () => {
    expect(transaction.input.amount).toEqual(wallet.balance);
  });



  describe("transacting with an ampunt that exceeds the balance", () => {
    beforeEach(() => {
      amount = 50000;
      transaction = Transaction.newTransaction(wallet, recipient, amount);
    });

    it('does not create transaction', () => {
      expect(transaction).toEqual(undefined);
    });
  });
  
});
