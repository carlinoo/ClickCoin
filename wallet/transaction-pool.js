// This class will represent the Pool of transactions from where cleints get them to create a block
class TransactionPool {
	constructor() {
			this.transactions = [];
	}

	// Update ...
	updateOrAddTransaction(transaction) {
		let transactionWithID = this.transactions.find(t => t.id === transaction.id);

		// If if there is a transaction, they are trying to update it. Else we add the transaction to the list
		if (transactionWithID) {
			this.transactions[this.transactions.indexOf(transactionWithID)] = transaction;
		} else {
			this.transactions.push(transaction);
		}
	}


	// Method to return (if any) an existing transaction in the pool with the address of the passed address
	existingTransaction(address) {
		return this.transactions.find(t => t.input.address === address);
	}
}


module.exports = TransactionPool;