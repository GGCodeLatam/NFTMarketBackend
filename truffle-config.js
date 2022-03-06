const path = require('path');
require('babel-register');
require('dotenv').config();
const HDWalletProvider = require("@truffle/hdwallet-provider");

const MNEMONIC = process.env.MNEMONIC;
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;

module.exports = {
  contracts_build_directory: path.join(__dirname, "/build/contracts"),
  networks: {
    development: {
      host: '127.0.0.1',
      port: 7545,
      network_id: '5777'
    },
    ropsten: {
      provider: function() {
       return new HDWalletProvider(MNEMONIC, "https://ropsten.infura.io/v3/8bd67d1b9b024577bab274cde31bcf70");
      },
      network_id: 3,
      gas: 4500000,
      gasPrice: 10000000000,
    }
  },
  compilers: {
    solc: {
      version: "0.8.7",
      settings: {
      optimizer: {
      enabled: false,
      runs: 200
      },
      }
    }
  },
  plugins: [
    'truffle-plugin-verify'
  ],
  api_keys: {
    etherscan: ETHERSCAN_API_KEY
  }
}
