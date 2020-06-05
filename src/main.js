const SHA512 = require('crypto-js/sha512');

class Block {
    constructor(index, timestamp, data, previousHash = '') {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
    }

    calculateHash() {
        return SHA512(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
    }

}

class Blockhcain {
    constructor() {
        this.chain = [this.createGenesisBlock()]
    }

    createGenesisBlock() {
        return new Block(0, this.getTimestamp(), {
            message: 'init'
        }, 0)
    }

    getTimestamp() {
        return Date.now() / 1000 | 0;
    }

    getLastBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock) {
        newBlock.previousHash = this.getLastBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
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

myCoin.addBlock(new Block(1, myCoin.getTimestamp(), {
    message: 'Block 1',
    amout: 5
}));

myCoin.addBlock(new Block(2, myCoin.getTimestamp(), {
    message: 'Block 2',
    amout: 10
}));

console.log(JSON.stringify(myCoin, 0, 2));
console.log(myCoin.isChainValid());