const SHA512 = require('crypto-js/sha512');

class Transaction {
  constructor(fromAddress, toAddress, amout) {
    this.fromAddress = fromAddress;
    this.toAddress = toAddress;
    this.amout = amout;
  }
}

class Block {
  constructor(timestamp, transactions, previousHash = '') {
    this.timestamp = timestamp;
    this.transactions = transactions;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
    this.noce = 0;
  }

  calculateHash() {
    return SHA512(this.index + this.previousHash + this.timestamp + JSON.stringify(this.transactions) + this.noce).toString();
  }

  mineBlock(difficulty) {
    while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join('0')) {
      this.noce++;
      this.hash = this.calculateHash();
    }

    console.log('Block mined:', this.hash);
  }

}

class Blockhcain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
    this.difficulty = 2;
    this.pendingTransactions = [];
    this.miningReward = 100;
  }

  createGenesisBlock() {
    return new Block(this.getTimestamp(), 'init', 0)
  }

  getTimestamp() {
    return Date.now() / 1000 | 0;
  }

  getLastBlock() {
    return this.chain[this.chain.length - 1];
  }

  miningPendingTransactions(miningRewardAddress) {
    let block = new Block(myCoin.getTimestamp(), this.pendingTransactions);
    block.mineBlock(this.difficulty);

    console.log('Block successfully mined!');
    this.chain.push(block);

    this.pendingTransactions = [
      new Transaction(null, miningRewardAddress, this.miningReward)
    ];
  }

  createTransaction(transaction) {
    this.pendingTransactions.push(transaction);
  }

  getBalanceOfAddress(address) {
    let balance = 0;

    for (const block of this.chain) {
      for (const trans of block.transactions) {
        if (trans.fromAddress === address) {
          balance -= trans.amout;
        }

        if (trans.toAddress === address) {
          balance += trans.amout;
        }
      }
    }

    return balance;
  }

  isChainValid() {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];

      if (currentBlock.hash !== currentBlock.calculateHash()) {
        return false;
      }

      if (currentBlock.previousHash !== previousBlock.hash) {
        return false;
      }

      return true;
    }
  }
}

let myCoin = new Blockhcain();

myCoin.createTransaction(new Transaction('address1', 'address2', 100));
myCoin.createTransaction(new Transaction('address2', 'address1', 50));

console.log('Starting the minder...');
myCoin.miningPendingTransactions('miner-address');

console.log('Balance of miner is', myCoin.getBalanceOfAddress('miner-address'));

console.log('Starting the minder...');
myCoin.miningPendingTransactions('miner-address');

console.log('Balance of miner is', myCoin.getBalanceOfAddress('miner-address'));
