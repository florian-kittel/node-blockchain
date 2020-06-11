const EC = require('elliptic').ec;
const ec = new EC('secp256k1');
const bs58 = require('bs58')

// Reference: https://asecuritysite.com/encryption/bit_keys

class Keygenerator {
  constructor() {}

  generate() {
    const key = ec.genKeyPair();
    const publicKey = key.getPublic('hex');
    const privateKey = key.getPrivate('hex');

    return {
      privateKey,
      publicKey,
      WiF: bs58.encode(Buffer.from(privateKey, 'hex')),
      address: bs58.encode(Buffer.from(publicKey, 'hex')),
    }
  }
}

module.exports.Keygenerator = Keygenerator;
