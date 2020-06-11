const {
  Keygenerator
} = require('./keygenerator');

const keygenerator = new Keygenerator();

const keys = keygenerator.generate();

console.log('Generated keys');
console.log(keys);
