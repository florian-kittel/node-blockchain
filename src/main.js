const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

const {
  Blockchain,
  Transaction
} = require('./blockchain');

// Example Public keys for Demo
const user1Key = ec.keyFromPrivate('a2f7862f9fa0603f887b404c2898b4f4832a45ca1ae85d39f9897af77031089b');
const user1WalletAddress = user1Key.getPublic('hex');

const user2Key = ec.keyFromPrivate('0d538fc8db46ae9885ae2a260e4362a2a15b05dc9ecba12caf9adeb1b54b40a1');
const user2WalletAddress = user2Key.getPublic('hex');

const user3Key = ec.keyFromPrivate('22d12ca495c1dcf7f8b00fc0d7a8bc9543fbeb1c0b6d8f1e0a0c85015423d238');
const user3WalletAddress = user3Key.getPublic('hex');

const myKey = ec.keyFromPrivate('8e72d21d875644dd4a98f3fa665b31bd7b6413799d96b5677884626e062ecca2');
const myWalletAddress = myKey.getPublic('hex');

let myCoin = new Blockchain();

const initialOffering = new Transaction(user1WalletAddress, user1WalletAddress, 0);
initialOffering.signTransaction(user1Key);
myCoin.addTransaction(initialOffering);

console.log('Starting initial miner...');
myCoin.miningPendingTransactions(myWalletAddress);

console.log('Transfer 10 from my wallet to user2');
const tx1 = new Transaction(myWalletAddress, user2WalletAddress, 10);
tx1.signTransaction(myKey);
myCoin.addTransaction(tx1);

const tx2 = new Transaction(myWalletAddress, user3WalletAddress, 30);
tx2.signTransaction(myKey);
myCoin.addTransaction(tx2);

console.log('Starting the miner...');
myCoin.miningPendingTransactions(user1WalletAddress);

console.log('Transfer 10 from user1 wallet to user3');
const tx3 = new Transaction(user1WalletAddress, user3WalletAddress, 10);
tx3.signTransaction(user1Key);
myCoin.addTransaction(tx3);

console.log('Starting the miner...');
myCoin.miningPendingTransactions(user2WalletAddress);


console.log('Balance of my wallet is', myCoin.getBalanceOfAddress(myWalletAddress));
console.log('Balance of user 1 is', myCoin.getBalanceOfAddress(user1WalletAddress));
console.log('Balance of user 2 is', myCoin.getBalanceOfAddress(user2WalletAddress));
console.log('Balance of user 3 is', myCoin.getBalanceOfAddress(user3WalletAddress));

console.log('Is chain valid?', myCoin.isChainValid());

// console.log(JSON.stringify(myCoin, null, 4));
