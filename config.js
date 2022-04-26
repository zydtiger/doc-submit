const path = require('path'),
  sha256 = require('sha256')

let config = {
  log: console.log,
  err: console.error,
  root: __dirname,
  public: path.resolve(__dirname, 'files/'),
  name: 'c1c224b03cd9bc7b6a86d77f5dace40191766c485cd55dc48caf9ac873335d6f',
  pass: '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92',
}

module.exports = config;

// console.log(sha256('123456'))