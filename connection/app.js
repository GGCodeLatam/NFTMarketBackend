const contract = require('truffle-contract');

const nftmarket_artifact = require('../build/contracts/NFTMarket.json');
var NFTMarket = contract(nftmarket_artifact);

module.exports = {
  start: function(callback) {
    var self = this;

    // Bootstrap the NFTMarket abstraction for Use.
    NFTMarket.setProvider(self.web3.currentProvider);

    // Get the initial account balance so it can be displayed.
    self.web3.eth.getAccounts(function(err, accs) {
      if (err != null) {
        console.log("There was an error fetching your accounts.");
        return;
      }

      if (accs.length == 0) {
        console.log("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
        return;
      }
      self.accounts = accs;
      self.account = self.accounts[2];

      callback(self.accounts);
    });
  },
  fetchMarketItems: function(items, callback) {
    var self = this;

    // Bootstrap the NFTMarket abstraction for Use.
    NFTMarket.setProvider(self.web3.currentProvider);

    var meta;
    NFTMarket.deployed().then(function(instance) {
      meta = instance;
      return meta.getBalance.call(items, {from: items});
    }).then(function(value) {
        callback(value.valueOf());
    }).catch(function(e) {
        console.log(e);
        callback("Error 404");
    });
  },
/*   refreshBalance: function(account, callback) {
    var self = this;

    // Bootstrap the NFTMarket abstraction for Use.
    NFTMarket.setProvider(self.web3.currentProvider);

    var meta;
    NFTMarket.deployed().then(function(instance) {
      meta = instance;
      return meta.getBalance.call(account, {from: account});
    }).then(function(value) {
        callback(value.valueOf());
    }).catch(function(e) {
        console.log(e);
        callback("Error 404");
    });
  }, */


 fetchMarketItems: function(amount, sender, receiver, callback) {
  var self = this;

  // Bootstrap the NFTMarket abstraction for Use.
  NFTMarket.setProvider(self.web3.currentProvider);

  var meta;
  NFTMarket.deployed().then(function(instance) {
    meta = instance;
    return meta.sendCoin(receiver, amount, {from: sender});
  }).then(function() {
    self.refreshBalance(sender, function (answer) {
      callback(answer);
    });
  }).catch(function(e) {
    console.log(e);
    callback("ERROR 404");
  });
}
}
