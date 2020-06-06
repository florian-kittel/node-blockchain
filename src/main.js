const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

const {
  Blockhcain,
  Transaction
} = require('./blockchain');

// Example Public key for Demo
const myKey = ec.keyFromPrivate('8e72d21d875644dd4a98f3fa665b31bd7b6413799d96b5677884626e062ecca2');
const myWalletAddress = myKey.getPublic('hex');

let myCoin = new Blockhcain();

const tx1 = new Transaction(myWalletAddress, 'public key goes here', 10);
tx1.signTransaction(myKey);
myCoin.addTransaction(tx1);

console.log('Starting the minder...');
myCoin.miningPendingTransactions(myWalletAddress);

console.log('Balance of miner is', myCoin.getBalanceOfAddress(myWalletAddress));

console.log('Is chain valid?', myCoin.isChainValid());

// console.log(JSON.stringify(myCoin, null, 4));
